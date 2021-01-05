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

console.log('Get an Account:');
console.log('--------------------------------------------------------------------------------');
params = {
    TableName: 'authorization_local',
    Key: {
        pkey: 'account:a72dfb93-c292-43ab-8e19-c34a60ed8cdb',
        skey: 'metadata:a72dfb93-c292-43ab-8e19-c34a60ed8cdb'
    }
};
// documentClient.get(params, callbackHandler);


console.log('Get teams of Account:');
console.log('--------------------------------------------------------------------------------');
params = {
    TableName: 'authorization_local',
    KeyConditionExpression: 'pkey = :pkey and begins_with(skey, :skey)',
    ExpressionAttributeValues: {
        ":pkey": 'account:a72dfb93-c292-43ab-8e19-c34a60ed8cdb',
        ":skey": 'team:',
    }
};
documentClient.query(params, callbackHandler);
