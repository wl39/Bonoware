
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
            let getTransactionParam = {
                TableName: "Transaction",
                Key: {
                    merchant_uid: result.merchant_uid,
                }
            }
            db.get(getTransactionParam, (err, transactionData) => {

                if (err) {
                    callback(err, null)
                }
                else {
                    let shippingPrice;
                    if (result.buyer_postcode.startsWith('63')) {
                        shippingPrice = 5000
                    } else {
                        shippingPrice = 2500
                    }
                    if ((result.amount === (transactionData.Item.Price - transactionData.Item.Point) + transactionData.Item.ShippingPrice)
                        && (transactionData.Item.ShippingPrice === shippingPrice)) {

                        let params = {
                            TableName: "Shoes",

                            FilterExpression: "OnSale=:onSale and Size=:Size and Model=:Model and Price=:Price",
                            ExpressionAttributeValues: {
                                ":Model": transactionData.Item.Model,
                                ":onSale": 2,
                                ":Size": transactionData.Item.Size,
                                ":Price": transactionData.Item.Price
                            }
                        }

                        db.scan(params, (err, firstScan) => {
                            if (err) callback(err, null);
                            else { //성공
                                if (firstScan.Items.length === 0) { // 상품이없을때 환불처리
                                    let cancelParam = {
                                        imp_uid: import_uid,
                                        reason: "상품 품절1",
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
                                        }
                                        else {
                                            //console.log("판매완료")
                                            let userParam = {
                                                TableName: "User",
                                                Key: {
                                                    authID: transactionData.Item.Buyer
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

                                                    let GivePointParam = {
                                                        TableName: "User",
                                                        Key: {
                                                            authID: firstScan.Items[0].Seller
                                                        },
                                                        UpdateExpression: "add balance :money",
                                                        ExpressionAttributeValues: {
                                                            ':money': (transactionData.Item.Price) * 0.93
                                                        }
                                                    }
                                                    db.update(GivePointParam, (err, data7) => {
                                                        if (err) {

                                                            callback(err, null);
                                                        }
                                                        else {

                                                            let updateStockParam = {
                                                                TableName: "Stock",
                                                                Key: {
                                                                    Type: "Shoe",
                                                                    Model: transactionData.Item.Model
                                                                },
                                                                UpdateExpression: "add SoldCount :one, StockCount :minOne",
                                                                ExpressionAttributeValues: {
                                                                    ':one': 1,
                                                                    ':minOne': -1
                                                                },
                                                                ReturnValues: "ALL_NEW"
                                                            }
                                                            db.update(updateStockParam, (err, data1111) => {
                                                                if (err) {
                                                                    callback(err, null);
                                                                }
                                                                else {
                                                                    let queryForLowestPrice = {
                                                                        TableName: "Shoes",
                                                                        IndexName: 'Model-OnSale-index',
                                                                        KeyConditionExpression: "Model = :Model and OnSale = :OnSale",
                                                                        ExpressionAttributeValues: {
                                                                            ":Model": transactionData.Item.Model,
                                                                            ":OnSale": 2,
                                                                        }
                                                                    }

                                                                    db.query(queryForLowestPrice, (errQuery, dataQuery) => {
                                                                        if (errQuery) {
                                                                            callback("errorQueryLowest", null)
                                                                        }
                                                                        else {
                                                                            if (dataQuery.Items.length === 0) {
                                                                                let updateStockParam2 = {
                                                                                    TableName: "Stock",
                                                                                    Key: {
                                                                                        Type: "Shoe",
                                                                                        Model: transactionData.Item.Model
                                                                                    },
                                                                                    UpdateExpression: "REMOVE SizePrice.#number SET LowestPrice = :currentLowest, Profit = :Profit",
                                                                                    ExpressionAttributeNames: { "#number": transactionData.Item.Size },
                                                                                    ExpressionAttributeValues: {
                                                                                        ":currentLowest": 0,
                                                                                        ":Profit": 0
                                                                                    },
                                                                                }

                                                                                db.update(updateStockParam2, (err, data123) => {
                                                                                    if (err) {
                                                                                        callback(err, null);
                                                                                    }
                                                                                    else {
                                                                                        context.done(null, "finished hard2")

                                                                                    }
                                                                                })
                                                                            }
                                                                            else {
                                                                                let currentshoe_price_lowest = Infinity;
                                                                                let currentsize_price_lowest = Infinity;
                                                                                let booleanThis = false;
                                                                                for (let x = 0; x < dataQuery.Items.length; x++) { // find lowest price
                                                                                    if (dataQuery.Items[x].Price < currentshoe_price_lowest) {
                                                                                        currentshoe_price_lowest = dataQuery.Items[x].Price
                                                                                    }
                                                                                    if (dataQuery.Items[x].Size === transactionData.Item.Size) {
                                                                                        booleanThis = true;
                                                                                        if (currentsize_price_lowest > dataQuery.Items[x].Price) {
                                                                                            currentsize_price_lowest = dataQuery.Items[x].Price
                                                                                        }
                                                                                    }
                                                                                }
                                                                                if (booleanThis) { // 똑같은신발사이즈 있을떄

                                                                                    let updateStockParam2 = {
                                                                                        TableName: "Stock",
                                                                                        Key: {
                                                                                            Type: "Shoe",
                                                                                            Model: transactionData.Item.Model
                                                                                        },
                                                                                        UpdateExpression: "SET LowestPrice = :currentLowest, Profit = :Profit, SizePrice.#number = :shoeLowestPrice",
                                                                                        ExpressionAttributeNames: { "#number": transactionData.Item.Size },
                                                                                        ExpressionAttributeValues: {
                                                                                            ":currentLowest": currentshoe_price_lowest,
                                                                                            ":Profit": currentshoe_price_lowest - data1111.Attributes.ReleasePrice,
                                                                                            ":shoeLowestPrice": currentsize_price_lowest
                                                                                        },
                                                                                    }

                                                                                    db.update(updateStockParam2, (err, data123) => {
                                                                                        if (err) {
                                                                                            callback(err, null);
                                                                                        }
                                                                                        else {
                                                                                            context.done(null, "finished hard2")

                                                                                        }
                                                                                    })
                                                                                    // 신발 사이즈 똑같은거 있나 확인, 없으면 리무브 lowest price update
                                                                                }
                                                                                else {
                                                                                    let updateStockParam2 = {
                                                                                        TableName: "Stock",
                                                                                        Key: {
                                                                                            Type: "Shoe",
                                                                                            Model: transactionData.Item.Model
                                                                                        },
                                                                                        UpdateExpression: "REMOVE SizePrice.#number SET LowestPrice = :currentLowest, Profit = :Profit",
                                                                                        ExpressionAttributeNames: { "#number": transactionData.Item.Size },
                                                                                        ExpressionAttributeValues: {
                                                                                            ":currentLowest": currentshoe_price_lowest,
                                                                                            ":Profit": currentshoe_price_lowest - data1111.Attributes.ReleasePrice
                                                                                        },
                                                                                    }

                                                                                    db.update(updateStockParam2, (err, data123) => {
                                                                                        if (err) {
                                                                                            callback(err, null);
                                                                                        }
                                                                                        else {
                                                                                            context.done(null, "finished hard123123")

                                                                                        }
                                                                                    })

                                                                                }

                                                                            }
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                    //판매완료
                                                }
                                            })
                                        }
                                    })

                                }
                            }
                        })
                    }
                    else {
                        let cancelParam = {
                            imp_uid: import_uid,
                            reason: "상품 품절2",
                            refund_holder: result.buyer_name
                        }
                        if (result.pay_method === "vbank") {
                            cancelParam.refund_bank = result.vbank_code;
                            cancelParam.refund_account = result.vbank_num;
                            cancelParam.refund_holder = result.vbank_holder;
                        }

                        iamport.payment.cancel(cancelParam).then(function (result) {
                            context.done(null, "품절상품 상품 환불")
                        }).catch(function (error) {
                            callback(error, null);
                            //환불 실패
                        });
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