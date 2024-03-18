const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' })

exports.handler = function (event, context, callback) {

    // db 에뭐가있는지 확인 후 이름 수정. 그리고 업로드 + 디비에 업로드
    let params = {
        TableName: "Item"
    }
    //Delete everything from DB
    //Get All Shoes
    //Compare Dates
    //Push Most Recent
    //Values are already Updated After ItemUpdate Handler.
    db.scan(params, (err, data) => {
        if (err) callback(err, null);
        else {

            let arrayOfShoeObjects = []
            for (let x = 0; x < data.Items.length; x++) {

                if (x === 0) {
                    arrayOfShoeObjects.push(data.Items[x])
                }

                else {
                    let k = null;


                    for (let z = x; z > 0; z--) {
                        if (arrayOfShoeObjects[z - 1].ReleaseDate <= data.Items[x].ReleaseDate) {
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
            // console.log(arrayOfShoeObjects)
            // for (let qwer = 0; qwer < 10; qwer++) {
            //     let paramsAddShoesToMostRecent = {
            //         TableName: "MostRecent",
            //         Item: {
            //             ImageURL: arrayOfShoeObjects[qwer].ImageURL,
            //             Model: arrayOfShoeObjects[qwer].Model,
            //             ModelCount: qwer + 1,
            //             LowestPrice: arrayOfShoeObjects[qwer].LowestPrice,
            //             SoldCount: arrayOfShoeObjects[qwer].SoldCount,
            //             StockCount: arrayOfShoeObjects[qwer].StockCount,
            //             ReleaseDate: arrayOfShoeObjects[qwer].ReleaseDate
            //         }

            //     }
            //     db.put(paramsAddShoesToMostRecent, (err, someData) => {
            //         if (err) {
            //             console.log(err)
            //         }
            //         if (someData) {
            //             console.log(someData)
            //         }
            //     })
            // }
            //console.log(arrayOfShoeObjects[0].Model)
            // for (let qwer = 9; qwer >= 0; qwer--) {
            //     console.log(qwer)
            //     console.log(arrayOfShoeObjects[qwer].Model)

            //     let paramsAddShoesToMostRecent = {
            //         TableName: "MostRecent",
            //         Key: {
            //             "ModelCount": qwer + 1,
            //         },
            //         ExpressionAttributeValues: {
            //             ":ImageURL": arrayOfShoeObjects[qwer].ImageURL,
            //             ":Model": arrayOfShoeObjects[qwer].Model,
            //             ":LowestPrice": arrayOfShoeObjects[qwer].LowestPrice,
            //             ":SoldCount": arrayOfShoeObjects[qwer].SoldCount,
            //             ":StockCount": arrayOfShoeObjects[qwer].StockCount,
            //             ":ReleaseDate": arrayOfShoeObjects[qwer].ReleaseDate
            //         },
            //         UpdateExpression: "set ImageURL = :ImageURL, Model = :Model, LowestPrice = :LowestPrice, SoldCount = :SoldCount, StockCount = :StockCount, ReleaseDate = :ReleaseDate"

            //     }
            //     db.update(paramsAddShoesToMostRecent, (err, someData) => {
            //         if (err) {
            //             console.log(err)
            //         }
            //         if (someData) {
            //             //  console.log(someData)
            //         }
            //     })
            // }


            for (let qwer = 0; qwer < 10; qwer++) {
                //console.log(qwer)

                let paramsAddShoesToMostRecent = {
                    TableName: "MostRecent",
                    Key: {
                        "ModelCount": 10 - qwer,
                    },
                    ExpressionAttributeValues: {
                        ":ImageURL": arrayOfShoeObjects[qwer].ImageURL,
                        ":Model": arrayOfShoeObjects[qwer].Model,
                        ":LowestPrice": arrayOfShoeObjects[qwer].LowestPrice,
                        ":SoldCount": arrayOfShoeObjects[qwer].SoldCount,
                        ":StockCount": arrayOfShoeObjects[qwer].StockCount,
                        ":ReleaseDate": arrayOfShoeObjects[qwer].ReleaseDate
                    },
                    UpdateExpression: "set ImageURL = :ImageURL, Model = :Model, LowestPrice = :LowestPrice, SoldCount = :SoldCount, StockCount = :StockCount, ReleaseDate = :ReleaseDate"

                }
                db.update(paramsAddShoesToMostRecent, (err, someData) => {
                    if (err) {
                        callback(err, null)
                    }
                    if (someData) {
                        context.done(null, "Successfully Updated")
                    }
                })
            }
        }
    })

}


