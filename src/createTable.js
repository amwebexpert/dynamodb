const AWS = require('aws-sdk');
AWS.config.update({ region: 'local', endpoint: 'http://localhost:8000' });
const dynamodb = new AWS.DynamoDB();
let params;

function callbackHandler(err, data) {
    if (err) {
        console.log('ERROR', err);
    } else {
        // console.log('SUCCESS', JSON.stringify(data));
        console.log('SUCCESS', data);
    }
}

// Table creation
params = {
    TableName: 'authorization_local',
    KeySchema: [
        { AttributeName: 'pkey', KeyType: 'HASH' },   // Partition key
        { AttributeName: 'skey', KeyType: 'RANGE' },  // Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: 'pkey', AttributeType: 'S' },
        { AttributeName: 'skey', AttributeType: 'S' },
        { AttributeName: 'entityType', AttributeType: 'S' },
        { AttributeName: 'name', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
    GlobalSecondaryIndexes: [
        {
            IndexName: 'inverted_index',
            KeySchema: [
                {
                    AttributeName: 'skey',
                    KeyType: 'HASH'
                },
                {
                    AttributeName: 'pkey',
                    KeyType: 'RANGE'
                }
            ],
            Projection: {
                ProjectionType: 'ALL' // ALL, KEYS_ONLY, INCLUDE
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'name_index',
            KeySchema: [
                {
                    AttributeName: 'entityType',
                    KeyType: 'HASH'
                },
                {
                    AttributeName: 'name',
                    KeyType: 'RANGE'
                }
            ],
            Projection: {
                ProjectionType: 'ALL' // ALL, KEYS_ONLY, INCLUDE
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
    ]
};
dynamodb.createTable(params, callbackHandler);
