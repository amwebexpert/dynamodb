const AWS = require('aws-sdk');
AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000'
});

var params = {
    TableName: 'authorization_test',
    KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },  // Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'N' },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

var dynamodb = new AWS.DynamoDB();
dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.error('Error', JSON.stringify(err, null, 2));
    } else {
        console.log('Created table.', JSON.stringify(data, null, 2));
    }
});
