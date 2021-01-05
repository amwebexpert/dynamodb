const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({ region: 'local', endpoint: 'http://localhost:8000' });
const documentClient = new AWS.DynamoDB.DocumentClient();
let params;

function callbackHandler(err, data) {
    if (err) {
        console.log('ERROR', err);
    } else {
        // console.log('SUCCESS', JSON.stringify(data));
        console.log('SUCCESS', data);
    }
}

GlobalSecondaryIndexes: [
    {
        IndexName: 'name_index',
        KeySchema: [
            {
                AttributeName: 'pkey',
                KeyType: 'HASH'
            },
            {
                AttributeName: 'name',
                KeyType: 'RANGE'
            }
        ],
        Projection: {
            ProjectionType: 'KEYS_ONLY'
        },
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    },
]

console.log('Get Account by name:');
console.log('--------------------------------------------------------------------------------');
params = {
    TableName: 'authorization_local',
    IndexName: 'name_index',
    KeyConditions: 'begins_with(pkey, :prefix)',
    FilterExpression: 'begins_with(#name, :name)',
    ExpressionAttributeNames: {
        "#name": 'name',
    },
    ExpressionAttributeValues: {
        ":name": 'John',
        ":prefix": 'user:',
    }
};
documentClient.query(params, callbackHandler);
