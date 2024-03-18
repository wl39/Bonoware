
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' })

exports.handler = function (event, context, callback) {
    //in lambda check if OnSale is 1
    //update the item and set OnSale to 1
    if (parseInt(event.price) > 0) {


        let checkerParamsForOnSale = {
            TableName: "Shoes",
            Key: {
                ProductID: event.pid,
                Seller: event.authID
            }
        }
        docClient.get(checkerParamsForOnSale, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {

                if (data.Item.OnSale === 1) {
                    let checkerParamsForUpdate = {
                        TableName: "Shoes",
                        Key: {
                            ProductID: event.pid,
                            Seller: event.authID
                        },
                        UpdateExpression: "set OnSale = :b, Price = :c",
                        ExpressionAttributeValues: {
                            ":b": 2,
                            ":c": parseInt(event.price),
                        }
                    }

                    docClient.update(checkerParamsForUpdate, (err, data2) => {
                        if (err) {
                            callback(err, null);
                        }
                        else {
                            context.done(null, event)
                        }
                    })
                }
                else {
                    callback(err, null)
                }
            }
        })

    }
    else {
        callback(err, null)
    }

}

