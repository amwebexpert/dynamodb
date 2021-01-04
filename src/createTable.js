const AWS = require('aws-sdk');
AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000'
});

var params = {
    TableName: 'authorization_local',
    KeySchema: [
        { AttributeName: 'pkey', KeyType: 'HASH' },  // Partition key
        { AttributeName: 'skey', KeyType: 'RANGE' },  // Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: 'pkey', AttributeType: 'S' },
        { AttributeName: 'skey', AttributeType: 'S' },
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
