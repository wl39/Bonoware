
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' })
const Iamport = require('iamport');

exports.handler = function (event, context, callback) {
    var iamport = new Iamport({
        impKey: '3872587144330633',
        impSecret: 'Qt9weIoCx8S70Beq3xO4a7pxV4k3DdftHo0V6oyDxqKx2ZX5xMaIUzgPEBThP8LwwLsCa0gHr1fu1dAz'
    });
    // 
    // 아임포트 고유 아이디로 결제 정보를 조회
    let import_uid = JSON.parse(event.body).imp_uid
    iamport.payment.getByImpUid({
        imp_uid: import_uid
    }).then(function (result) {
        if (result.status === "paid") {
            let user = result.merchant_uid.split('_')[0];
            //console.log(user)

            let shoeInfo = result.name.split(' ');

            // console.log(shoeInfo);
            //console.log(result.amount)
            let total_price = result.amount;
            if (result.buyer_postcode.startsWith('63')) {
                total_price = total_price - 5000
            } else {
                total_price = total_price - 2500
            }



            //console.log(data)
            let params = {
                TableName: "Shoes",

                FilterExpression: "OnSale=:onSale and Size=:Size and SID=:SID and Price=:Price",
                ExpressionAttributeValues: {
                    ":SID": shoeInfo[1],
                    ":onSale": 2,
                    ":Size": parseInt(shoeInfo[3]),
                    ":Price": total_price
                }
            }

            db.scan(params, (err, firstScan) => {
                if (err) callback(err, null);
                else { //성공
                    if (firstScan.Items.length === 0) { // 상품이없을때 환불처리
                        let cancelParam = {
                            imp_uid: import_uid,
                            reason: "상품 품절",
                            refund_holder: result.buyer_name
                        }
                        if (result.pay_method === "vbank") {
                            cancelParam.refund_bank = result.vbank_code;
                            cancelParam.refund_account = result.vbank_num;
                            cancelParam.refund_holder = result.vbank_holder;
                        }

                        iamport.payment.cancel(cancelParam).then(function (result) {
                            context.done(null, event)
                        }).catch(function (error) {
                            callback(error, null);
                            //환불 실패
                        });
                        //console.log("환불처리 완료")
                    }
                    else { // 재일 최근에 보낸사람 상품 찾기 상품있을때
                        firstScan.Items.sort((a, b) => {
                            let dayOne = a.SentTime.split("-");
                            let dayTwo = b.SentTime.split("-");
                            let timeOne = new Date(dayOne[2], dayOne[1], dayOne[0], dayOne[3], dayOne[4])
                            let timeTwo = new Date(dayTwo[2], dayTwo[1], dayTwo[0], dayTwo[3], dayTwo[4])
                            if (timeOne < timeTwo)
                                return -1;
                            if (timeOne > timeTwo)
                                return 1;
                            return 0;
                        });

                        let checkerParamsForUpdate = {
                            TableName: "Shoes",
                            Key: {
                                ProductID: firstScan.Items[0].ProductID,
                                Seller: firstScan.Items[0].Seller
                            },
                            UpdateExpression: "set OnSale = :b",
                            ExpressionAttributeValues: {
                                ":b": 0,
                            }
                        }

                        db.update(checkerParamsForUpdate, (err, updateData) => {
                            if (err) {
                                callback(err, null);
                                //console.log("판매오류")
                            }
                            else {
                                //console.log("판매완료")
                                let userParam = {
                                    TableName: "User",
                                    Key: {
                                        authID: user
                                    },
                                    UpdateExpression: "add #buying :buying",
                                    ExpressionAttributeNames: {
                                        '#buying': 'buying'
                                    },
                                    ExpressionAttributeValues: {
                                        ":buying": db.createSet([firstScan.Items[0].ProductID])
                                    }

                                }
                                db.update(userParam, (err, data6) => {
                                    if (err) {
                                        callback(err, null);
                                    }
                                    else {
                                        //판매완료


                                        // update shoe 


                                        let lambda = new AWS.Lambda({
                                            region: "ap-northeast-2",
                                            apiVersion: "2015-03-31",
                                        });
                                        let pullParams = {
                                            FunctionName: "UpdateItem",
                                            InvocationType: "Event",
                                            LogType: "None",
                                            Payload: JSON.stringify({
                                                None: "none"
                                            })
                                        };
                                        lambda.invoke(pullParams, (error, data) => {
                                            context.done(null, "Buying Complete")
                                        });
                                    }
                                })
                            }
                        })

                    }
                }

            })
        }
        else {
            context.done(null, "Unpaid Result");
        }


    }).catch(function (error) {
        callback(error, null);
    });
}