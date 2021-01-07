const AWS = require('aws-sdk');

AWS.config.update({ region: 'local', endpoint: 'http://localhost:8000' });
const documentClient = new AWS.DynamoDB.DocumentClient();

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
        skey: 'account'
    }
};
execute('Get an Account for CRUD operations:', 'get', params);

params = {
    TableName: 'authorization_local',
    KeyConditionExpression: 'pkey = :pkey and begins_with(skey, :skey)',
    ExpressionAttributeValues: {
        ":pkey": 'account:acc_id_1',
        ":skey": 'team:',
    }
};
execute('Find all teams of Account:', 'query', params);

params = {
    TableName: 'authorization_local',
    IndexName: 'name_index',
    KeyConditionExpression: 'skey = :entityType and begins_with(#name, :name)',
    ExpressionAttributeNames: {
        "#name": 'name',
    },
    ExpressionAttributeValues: {
        ":entityType": "account",
        ":name": 'W',
    }
};
execute('Find Account by name begins_with:', 'query', params);

params = {
    TableName: 'authorization_local',
    IndexName: 'entity_type_index',
    KeyConditionExpression: 'skey = :entityType',
    FilterExpression: 'contains(#name, :name)',
    ExpressionAttributeNames: {
        "#name": 'name',
    },
    ExpressionAttributeValues: {
        ":entityType": "account",
        ":name": 'c',
    }
};
execute('Find Account by name contains:', 'query', params);
