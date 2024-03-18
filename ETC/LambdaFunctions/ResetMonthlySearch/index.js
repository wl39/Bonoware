const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' })

exports.handler = function (event, context, callback) {

    let searchType = "PopularSearch"

    let param = {
        TableName: "Etc",
        Key: {
            Contents: searchType
        }
    }

    db.get(param, (err, data) => {
        if (err) callback(err, null);
        if (data) {
            let shoes = []
            for (let key in data.Item.Ranking) {
                shoes.push([key, data.Item.Ranking[key]]);
            }
            shoes.sort((a, b) => {
                return -(a[1] - b[1]);
            })
            let savedData = []
            for (let index = 0; index < 5; index++) {
                savedData.push([shoes[index][0], 5 - index])
            }


            let params = {
                TableName: "Etc",
                Item: {
                    "Contents": searchType,
                    "Ranking": {
                        [savedData[0][0]]: savedData[0][1],
                        [savedData[1][0]]: savedData[1][1],
                        [savedData[2][0]]: savedData[2][1],
                        [savedData[3][0]]: savedData[3][1],
                        [savedData[4][0]]: savedData[4][1]
                    }
                }
            }
            db.put(params, (err, data) => {
                if (err) callback(err, null);
                else {
                    context.done(null, event)
                }
            })

        }
    })

}


