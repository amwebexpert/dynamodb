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

console.log('Find all teams of Account:');
console.log('--------------------------------------------------------------------------------');
params = {
    TableName: 'authorization_local',
    KeyConditionExpression: 'pkey = :pkey and begins_with(skey, :skey)',
    ExpressionAttributeValues: {
        ":pkey": 'account:a72dfb93-c292-43ab-8e19-c34a60ed8cdb',
        ":skey": 'team:',
    }
};
// documentClient.query(params, callbackHandler);

console.log('Find all members of a team:');
console.log('--------------------------------------------------------------------------------');
params = {
    TableName: 'authorization_local',
    KeyConditionExpression: 'pkey = :pkey',
    ExpressionAttributeValues: {
        ":pkey": 'account:a72dfb93-c292-43ab-8e19-c34a60ed8cdb:team:d7b3a017-3987-4f4e-bc17-c9b89d0354cf',
    }
};
// documentClient.query(params, callbackHandler);

console.log('Find all teams an appUser if member of:');
console.log('--------------------------------------------------------------------------------');
params = {
    TableName: 'authorization_local',
    IndexName: 'inverted_index',
    KeyConditionExpression: 'skey = :skey', // This is the name of partition key of that inverted_index
    ExpressionAttributeValues: {
        ":skey": 'user:6e4f047f-97aa-473f-bd82-1b6e276c8210',
    }
};
// documentClient.query(params, callbackHandler);

console.log('Find teams by name inside an account:');
console.log('--------------------------------------------------------------------------------');
params = {
    TableName: 'authorization_local',
    KeyConditionExpression: 'pkey = :pkey',
    FilterExpression: 'contains(#name, :name)',
    ExpressionAttributeNames: {
        "#name": 'name',
    },
    ExpressionAttributeValues: {
        ":pkey": "account:a72dfb93-c292-43ab-8e19-c34a60ed8cdb",
        ":name": 'Team',
    }
};
// documentClient.query(params, callbackHandler);

console.log('Find Account by name begins_with:');
console.log('--------------------------------------------------------------------------------');
params = {
    TableName: 'authorization_local',
    IndexName: 'name_index',
    KeyConditionExpression: 'entityType = :entityType and begins_with(#name, :name)',
    ExpressionAttributeNames: {
        "#name": 'name',
    },
    ExpressionAttributeValues: {
        ":entityType": "account",
        ":name": 'W',
    }
};
documentClient.query(params, callbackHandler);

console.log('Find users by name begins_with:');
console.log('--------------------------------------------------------------------------------');
params = {
    TableName: 'authorization_local',
    IndexName: 'name_index',
    KeyConditionExpression: 'entityType = :entityType and begins_with(#name, :name)',
    ExpressionAttributeNames: {
        "#name": 'name',
    },
    ExpressionAttributeValues: {
        ":entityType": "appUser",
        ":name": 'J',
    }
};
documentClient.query(params, callbackHandler);
