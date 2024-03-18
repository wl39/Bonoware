const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' })

function formatDate() {
    let newDate = new Date()

    let month = '' + (newDate.getMonth() + 1);
    let day = '' + newDate.getDate();
    let year = newDate.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    let seconds = newDate.getSeconds();
    let ampm = hours >= 12 ? '오후' : '오전';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    let strTime = ampm + ' ' + hours + '시 ' + minutes + '분 ' + seconds + '초';

    return (([year, month, day].join('-')) + ' ' + strTime);
}

exports.handler = function (event, context, callback) {


    var params = {
        TableName: "Comments",
        KeyConditionExpression: "#Name = :Name",
        ExpressionAttributeNames: {
            "#Name": "Name"
        },
        ExpressionAttributeValues: {
            ":Name": event.Name
        },
        ScanIndexForward: false,
        Limit: 1
    };

    docClient.query(params, (err, data) => {
        if (err) callback("Server Too Busy", null);
        else {

            let CommentCounter = 0
            if (data.Count !== 0) {
                CommentCounter = data.Items[0].CommentNum
            }
            let putParam = {
                TableName: "Comments",
                Item: {
                    Name: event.Name,
                    CommentNum: CommentCounter + 1,
                    Writer: event.Writer,
                    Comment: event.Comment,
                    Date: formatDate(),
                    UID: event.UID,
                }
            }

            let counter = 0;
            const pushData = () => {
                docClient.put(putParam, (err, successData) => {
                    if (err) {
                        if (counter == 10) {
                            callback("Server Too Busy", null)
                        }
                        else {
                            putParam.Item.CommentNum += 1;
                            pushData()
                            counter++;
                        }
                    }
                    else {
                        context.done(null, "Added Comment");
                    }
                })
            }
            pushData()
        }
    })

}


