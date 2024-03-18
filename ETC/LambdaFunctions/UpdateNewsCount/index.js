const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' })

exports.handler = function (event, context, callback) {

    let updateParam = {
        TableName: "ShoeNews",
        Key: {
            News: "ShoeNews",
            IssueNum: event.IssueNum
        },
        UpdateExpression: "add #ViewCount :ViewCount",
        ExpressionAttributeNames: {
            '#ViewCount': 'ViewCount'
        },
        ExpressionAttributeValues: {
            ":ViewCount": 1
        },
    }
    docClient.update(updateParam, (err) => {
        if (err) callback(error, null);
        else {
            context.done(null, "Increment Complete")
        }
    })

}


