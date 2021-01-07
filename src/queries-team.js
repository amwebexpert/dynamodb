const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({ region: 'local', endpoint: 'http://localhost:8000' });
const documentClient = new AWS.DynamoDB.DocumentClient();
let params;

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
    KeyConditionExpression: 'pkey = :pkey',
    ExpressionAttributeValues: {
        ":pkey": 'account:acc_id_1:team:team_id_1',
    }
};
execute('Find all members of a team:', 'query', params);

params = {
    TableName: 'authorization_local',
    KeyConditionExpression: 'pkey = :pkey and begins_with(skey, :skey)',
    FilterExpression: 'contains(#name, :name)',
    ExpressionAttributeNames: {
        "#name": 'name',
    },
    ExpressionAttributeValues: {
        ":pkey": "account:acc_id_1",
        ":skey": "team:",
        ":name": 'Team',
    }
};
execute('Find teams by contains(name) inside an account:', 'query', params);
