var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
    endpoint: "http://localhost:8000"
});

var ddb = new AWS.DynamoDB();

var params = {
    TableName: process.argv[2]
};

ddb.deleteTable(params, function(err, data) {
    if (err && err.code === 'ResourceNotFoundException') {
        console.log("Error: Table not found");
    } else if (err && err.code === 'ResourceInUseException') {
        console.log("Error: Table in use");
    } else {
        console.log("Success", data);
    }
});