
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' })

exports.handler = function (event, context, callback) {
    let params = {
        TableName: "Transaction",
        Item: {
            Coupon: event.Coupon,
            Price: event.Price,
            Model: event.Model,
            Point: event.Point,
            ShippingPrice: event.ShippingPrice,
            Buyer: event.Buyer,
            merchant_uid: event.merchant_uid,
            Size: event.Size
        }
    };
    db.put(params, (err, data) => {
        if (err) callback(err, null);
        else {
            context.done(null, "added a transaction");
        }
    })
}