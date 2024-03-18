const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' })

exports.handler = function (event, context, callback) {



    let params2 = {
        TableName: "Item"
    }

    db.scan(params2, (err, data) => {
        if (err) callback(err, null);
        else {
            //console.log(data.Items)
            let arrayOfShoeObjects = [] // Model Name, Sold, Image Link, Cheapest Price

            //console.log(data)
            for (let x = 0; x < data.Items.length; x++) {

                if (x === 0) {
                    arrayOfShoeObjects.push(data.Items[x])
                }

                else {
                    let k = null;


                    for (let z = x; z > 0; z--) {
                        if (arrayOfShoeObjects[z - 1].SoldCount <= data.Items[x].SoldCount) {
                            k = z - 1;
                        }
                    }


                    if (k || k === 0) {
                        arrayOfShoeObjects.splice(k, 0, data.Items[x])
                    }
                    else {
                        arrayOfShoeObjects.push(data.Items[x])
                    }
                }
            }

            //console.log(arrayOfShoeObjects)

            for (let x = 0; x < 10; x++) {
                let params999 = {
                    TableName: "MostPopular",
                    Item: {
                        ModelCount: 10 - x,
                        Model: arrayOfShoeObjects[x].Model,
                        SoldCount: arrayOfShoeObjects[x].SoldCount,
                        LowestPrice: arrayOfShoeObjects[x].LowestPrice,
                        ImageURL: arrayOfShoeObjects[x].ImageURL,
                        StockCount: arrayOfShoeObjects[x].StockCount
                    }
                }

                db.put(params999, (err, data) => {
                    if (err) callback(err, null);
                    else context.done(null, "SuccessFully Finished");
                })
            }


        }
        //console.log("success");
    })
}


