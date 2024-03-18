
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' })

exports.handler = function (event, context, callback) {


    let BrandName = ["Adidas", "Nike", "Others"]
    for (let x = 0; x < BrandName.length; x++) {

        let params = {
            TableName: "Shoes",

            FilterExpression: "OnSale=:onSale and Brand=:brand",
            ExpressionAttributeValues: {
                ":brand": BrandName[x],
                ":onSale": 2,
            }
        }

        db.scan(params, (err, data) => {
            if (err) callback(err, null);
            else {
                let totalPrice = 0;
                data.Items.map(x => {
                    totalPrice += x.Price
                })

                let rightNow = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
                rightNow = rightNow.split("-")

                if ((rightNow[1]).length === 1) {
                    rightNow[1] = '0' + rightNow[1];
                }
                rightNow[2] = rightNow[2].split(" ")[0];
                if ((rightNow[2]).length === 1) {
                    rightNow[2] = '0' + rightNow[2];
                }
                rightNow = rightNow[0] + "-" + rightNow[1] + "-" + (rightNow[2]);
                let params3 = {
                    TableName: "MainGraph",
                    Key: {
                        Brand: BrandName[x]
                    },
                    UpdateExpression: 'set #data.#date = :data',
                    ExpressionAttributeNames: {
                        "#data": "Date",
                        "#date": rightNow
                    },
                    ExpressionAttributeValues: {
                        ":data": totalPrice
                    },
                    ReturnValues: "ALL_NEW"
                }
                db.update(params3, (err, data) => {
                    if (err) callback(err, null);
                    else {
                        context.done(null, event)
                    }
                })
            }
        })
    }
}

