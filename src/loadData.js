const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000'
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing Scranton into DynamoDB. Please wait.');
const entries = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));

entries.forEach(function (scran) {
    console.log(scran)
    const params = {
        TableName: 'authorization_test',
        Item: {
            id: scran.id,
            type: scran.type,
            name: scran.name,
            description: scran.description
        }
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log('PutItem succeeded:', scran.name);
        }
    });
});
