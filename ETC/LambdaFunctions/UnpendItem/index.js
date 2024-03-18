
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' })

exports.handler = (event, context, callback) => {
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
                callback("err1", null)
            }
            else {

                if (data.Item.OnSale === 1) {
                    //누가 살수있게만들어준다
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
                        },
                        ReturnValues: "ALL_NEW"
                    }

                    docClient.update(checkerParamsForUpdate, (err, StoreData) => {
                        if (err) {
                            callback("err2", null)
                        }
                        else {
                            // update Stock
                            let updateStock = {
                                TableName: "Stock",
                                Key: {
                                    Type: "Shoe",
                                    Model: StoreData.Attributes.Model
                                },
                                UpdateExpression: "add StockCount :AddOne",
                                ExpressionAttributeValues: {
                                    ":AddOne": 1,
                                },
                                ReturnValues: "ALL_NEW"
                            }
                            docClient.update(updateStock, (err, ModelData) => { // stock count 1  올려준다.

                                let queryForLowestPrice = {
                                    TableName: "Shoes",
                                    IndexName: 'Model-OnSale-index',
                                    KeyConditionExpression: "Model = :Model and OnSale = :OnSale",
                                    ExpressionAttributeValues: {
                                        ":Model": ModelData.Attributes.Model,
                                        ":OnSale": 2,
                                    }
                                }

                                docClient.query(queryForLowestPrice, (err2, queryData) => {
                                    if (err) {
                                        callback("error here 1", null)
                                    }
                                    else {
                                        // find lowest price and lowest price of this shoe.

                                        if (queryData.Items.length === 1) {
                                            let updateStock = {
                                                TableName: "Stock",
                                                Key: {
                                                    Type: "Shoe",
                                                    Model: ModelData.Attributes.Model
                                                },
                                                UpdateExpression: "SET LowestPrice = :lowestPrice, Profit = (:lowestPrice - :ReleasePrice), SizePrice.#number = :lowestPrice",
                                                ExpressionAttributeValues: {
                                                    ":lowestPrice": queryData.Items[0].Price,
                                                    ":ReleasePrice": ModelData.Attributes.ReleasePrice,
                                                },
                                                ExpressionAttributeNames: { "#number": StoreData.Attributes.Size }
                                            }
                                            docClient.update(updateStock, (errUpdateOneItem, dataUpdateOneItem) => {
                                                if (errUpdateOneItem) {
                                                    callback("error here2", null)
                                                }
                                                else {
                                                    context.done(null, "finished here5")
                                                }
                                            })
                                        }
                                        else { // 신발이 한개이상있을때
                                            let currentshoe_price_lowest = parseInt(event.price);
                                            let currentsize_price_lowest = parseInt(event.price)
                                            for (let x = 0; x < queryData.Items.length; x++) { // find lowest price
                                                if (queryData.Items[x].Price < currentshoe_price_lowest) {
                                                    currentshoe_price_lowest = queryData.Items[x].Price
                                                    if (queryData.Items[x].Size === StoreData.Attributes.Size) {
                                                        currentsize_price_lowest = queryData.Items[x].Price
                                                    }
                                                }
                                            }
                                            let updateStock2 = {
                                                TableName: "Stock",
                                                Key: {
                                                    Type: "Shoe",
                                                    Model: ModelData.Attributes.Model
                                                },
                                                ExpressionAttributeValues: {
                                                    ":lowestPrice": currentshoe_price_lowest,
                                                    ":lowestSizePrice": currentsize_price_lowest,
                                                    ":ReleasePrice": ModelData.Attributes.ReleasePrice,
                                                },
                                                ExpressionAttributeNames: { "#number": StoreData.Attributes.Size },
                                                UpdateExpression: "SET LowestPrice = :lowestPrice, Profit = (:lowestPrice - :ReleasePrice), SizePrice.#number = :lowestSizePrice",
                                            }
                                            docClient.update(updateStock2, (err123, data123) => {
                                                if (err123) {
                                                    callback("err123123", null)
                                                }
                                                else {
                                                    context.done(null, "Finished 123123123")
                                                }
                                            })
                                        }
                                    }
                                })
                            })
                        }
                    })
                }
                else {
                    callback("err6", null);
                }
            }
        })
    }
    else {
        callback(err, null);
    }
}