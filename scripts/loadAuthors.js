var AWS = require("aws-sdk");
var fs = require('fs');

var catalogo = JSON.parse(fs.readFileSync('./scripts/authors.json', 'utf8'));

console.log(":::::::::::::::::::::::::::::::::::Import authors to DynamoDB.");

AWS.config.update({
    region: "us-east-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

catalogo.forEach(function (author) {
    var params = {
        TableName: "Author",
        Item: {
            "emailId": author.email,
            "name": author.name,
            "birthdate": author.birthdate
        }
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add authors", author.id, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log(":::::::::::::::::::::::::::::::::::Update Success:", author.email);
        }
    });
});