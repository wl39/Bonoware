const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' })

exports.handler = function (event, context, callback) {

    let params3 = {
        TableName: "Shoes",
    }

    db.scan(params3, (err, dataShoe) => {
        if (err) callback(err, null);
        else {
            let shoeModelMap = new Map();
            for (let q = 0; q < dataShoe.Count; q++) {
                let shoeObject =
                    {
                        Model: dataShoe.Items[q].Model,
                        LowestPrice: 999999999,
                        HighestPrice: 0,
                        Brand: dataShoe.Items[q].Brand,
                        ImageURL: dataShoe.Items[q].ImageURL,
                        SizePrice: {},
                        Graph: {},
                        Histogram: {},
                        StockCount: 0,
                        SoldCount: 0,
                        PendingCount: 0,
                    };

                if (dataShoe.Items[q].OnSale === 2) {
                    // 신발이 이미 맵에 들어가있을때
                    //console.log(shoeModelMap.has(dataShoe.Items[q].Model))
                    //  console.log(shoeModelMap.get(dataShoe.Items[q].brand))
                    if (shoeModelMap.has(dataShoe.Items[q].Model)) {
                        //  console.log(shoeModelMap.get(dataShoe.Items[q].brand))
                        let hereObject = (shoeModelMap.get(dataShoe.Items[q].Model))
                        // console.log(hereObject)
                        shoeObject.Model = hereObject.Model
                        shoeObject.StockCount = hereObject.StockCount + 1
                        shoeObject.LowestPrice = hereObject.LowestPrice
                        shoeObject.HighestPrice = hereObject.HighestPrice
                        shoeObject.SizePrice = hereObject.SizePrice
                        shoeObject.Graph = hereObject.Graph
                        shoeObject.Histogram = hereObject.Histogram
                        shoeObject.SoldCount = hereObject.SoldCount
                        shoeObject.PendingCount = hereObject.PendingCount
                        //console.log(shoeObject)
                        // console.log(hereObject.SizePrice)

                        if (shoeObject.LowestPrice >= parseInt(dataShoe.Items[q].Price, 10)) {
                            shoeObject.LowestPrice = parseInt(dataShoe.Items[q].Price, 10)
                        }
                        if (shoeObject.HighestPrice <= parseInt(dataShoe.Items[q].Price, 10)) {
                            shoeObject.HighestPrice = parseInt(dataShoe.Items[q].Price, 10)
                        }

                        if (shoeObject.SizePrice[dataShoe.Items[q].Size] <= parseInt(dataShoe.Items[q].Price, 10)) {
                            shoeObject.SizePrice = {
                                ...shoeObject.SizePrice,
                                // [dataShoe.Items[q].Size]: parseInt(dataShoe.Items[q].Price)
                            }
                        }
                        else {
                            shoeObject.SizePrice =
                                {
                                    ...shoeObject.SizePrice,
                                    [dataShoe.Items[q].Size]: parseInt(dataShoe.Items[q].Price, 10)
                                }
                            //console.log("here2")
                        }
                        //  console.log(shoeObject.SizePrice)

                        shoeModelMap.set(dataShoe.Items[q].Model, shoeObject)
                    }
                    // 신발이 맵에 안들어가있을때
                    else {
                        // console.log(dataShoe.Items[q].Model + "is new.")
                        shoeObject.Model = dataShoe.Items[q].Model
                        shoeObject.StockCount = 1
                        shoeObject.LowestPrice = parseInt(dataShoe.Items[q].Price, 10)
                        shoeObject.HighestPrice = parseInt(dataShoe.Items[q].Price, 10)
                        shoeObject.SizePrice = { [dataShoe.Items[q].Size]: parseInt(dataShoe.Items[q].Price, 10) }
                        shoeModelMap.set(dataShoe.Items[q].Model, shoeObject)
                    }
                }
                if (dataShoe.Items[q].OnSale === 1) {
                    // console.log(dataShoe.Items[q].Model)
                    if (shoeModelMap.has(dataShoe.Items[q].Model)) { // when exists
                        let newShoeObject = shoeModelMap.get(dataShoe.Items[q].Model);
                        newShoeObject.PendingCount = newShoeObject.PendingCount + 1
                        shoeModelMap.set(dataShoe.Items[q].Model, newShoeObject)
                    }


                    else { // when new
                        shoeObject.Model = dataShoe.Items[q].Model
                        shoeObject.PendingCount = 1
                        shoeModelMap.set(dataShoe.Items[q].Model, shoeObject)
                        //sold
                    }
                }

                if (dataShoe.Items[q].OnSale === 0) {
                    // console.log(dataShoe.Items[q].Model)
                    if (shoeModelMap.has(dataShoe.Items[q].Model)) { // when exists
                        let newShoeObject = shoeModelMap.get(dataShoe.Items[q].Model);
                        newShoeObject.SoldCount = newShoeObject.SoldCount + 1
                        shoeModelMap.set(dataShoe.Items[q].Model, newShoeObject)
                    }


                    else { // when new
                        shoeObject.Model = dataShoe.Items[q].Model
                        shoeObject.SoldCount = 1
                        shoeModelMap.set(dataShoe.Items[q].Model, shoeObject)
                        //sold
                    }
                }
            }


            shoeModelMap.forEach(key => {
                //console.log(key)
                if(key.LowestPrice === 999999999) key.LowestPrice = 0;
                let params2 = {
                    TableName: "Item",
                    Key: {
                        Model: key.Model,
                    },
                    UpdateExpression: "set HighestPrice = :b, LowestPrice = :c, SoldCount = :d, StockCount = :e, SizePrice = :f",
                    ExpressionAttributeValues: {
                        ":b": key.HighestPrice,
                        ":c": key.LowestPrice,
                        ":d": key.SoldCount,
                        ":e": key.StockCount,
                        ":f": key.SizePrice

                    }
                }
                // console.log(key.SizePrice)
                //console.log(params2)
                if (key.SoldCount + key.StockCount !== 0) {



                    db.update(params2, (err, data) => {
                        if (err) callback(err, null);
                        else {
                            let lambda = new AWS.Lambda({
                                region: "ap-northeast-2",
                                apiVersion: "2015-03-31",
                            });
                            let pullParams = {
                                FunctionName: "UpdateMostPopular",
                                InvocationType: "Event",
                                LogType: "None",
                                Payload: JSON.stringify({
                                    None: "none"
                                })
                            };
                            lambda.invoke(pullParams, (error, data) => {
                                pullParams.FunctionName = "UpdateMostRecent"
                                lambda.invoke(pullParams, (error, data) => {
                                    pullParams.FunctionName = "UpdateMostCheapest"
                                    lambda.invoke(pullParams, (error, data) => {
                                        context.done(null, "Successfully Updated")
                                    });
                                });
                            });


                        };
                    })
                }
            })
        }
    })

}


