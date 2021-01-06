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

function execute(description, method, params) {
    documentClient[method](params, function (err, data) {
        console.log(description);
        console.log('--------------------------------------------------------------------------------');

        if (err) {
            console.log('ERROR', err);
        } else {
            // console.log('SUCCESS', JSON.stringify(data));
            console.log('SUCCESS', data);
        }
    });
}

params = {
    TableName: 'authorization_local',
    Key: {
        pkey: 'account:acc_id_1',
        skey: 'metadata:acc_id_1'
    }
};
// execute('Get an Account:', 'get', params);

params = {
    TableName: 'authorization_local',
    KeyConditionExpression: 'pkey = :pkey and begins_with(skey, :skey)',
    ExpressionAttributeValues: {
        ":pkey": 'account:acc_id_1',
        ":skey": 'team:',
    }
};
// execute('Find all teams of Account:', 'query', params);

params = {
    TableName: 'authorization_local',
    KeyConditionExpression: 'pkey = :pkey',
    ExpressionAttributeValues: {
        ":pkey": 'account:acc_id_1:team:team_id_1',
    }
};
execute('Find all members of a team:', 'query', params);

params = {
    TableName: 'authorization_local',
    IndexName: 'inverted_index',
    KeyConditionExpression: 'skey = :skey', // This is the name of partition key of that inverted_index
    ExpressionAttributeValues: {
        ":skey": 'user:user_id_3',
    }
};
// execute('Find all teams an appUser if member of:', 'query', params);

params = {
    TableName: 'authorization_local',
    KeyConditionExpression: 'pkey = :pkey',
    FilterExpression: 'contains(#name, :name)',
    ExpressionAttributeNames: {
        "#name": 'name',
    },
    ExpressionAttributeValues: {
        ":pkey": "account:acc_id_1",
        ":name": 'Team',
    }
};
// execute('Find teams by name inside an account:', 'query', params);

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
// execute('Find Account by name begins_with:', 'query', params);

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
//execute('Find users by name begins_with:', 'query', params);
