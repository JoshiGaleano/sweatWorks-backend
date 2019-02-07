var AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1",
    endpoint: "http://localhost:8000"
});

var ddb = new AWS.DynamoDB();

ddb.listTables({Limit: 10}, function(err, data) {
  if (err) {
    console.log("Error", err.code);
  } else {
    console.log("Table names are ", data.TableNames);
  }
});