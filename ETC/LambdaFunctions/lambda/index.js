
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' })

exports.handler = function (event, context, callback) {
    var params = {
        Item: {
            authID: event.userName,
            buying: docClient.createSet("Initial Value"),
            selling: docClient.createSet("Initial Value"),
            subscription: docClient.createSet("Initial Value"),
            balance: 0
        },
        TableName: "User"
    };

    docClient.put(params, function (err, data) {
        if (err) {
            callback(err, null);
        }
        else {
            context.done(null, event)
        }
    })
}

