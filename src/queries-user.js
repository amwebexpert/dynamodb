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
    IndexName: 'inverted_index',
    KeyConditionExpression: 'skey = :skey', // This is the name of partition key of that inverted_index
    ExpressionAttributeValues: {
        ":skey": 'user:user_id_3',
    }
};
execute('Find all teams an appUser if member of:', 'query', params);

params = {
    TableName: 'authorization_local',
    IndexName: 'name_index',
    KeyConditionExpression: 'skey = :entityType and begins_with(#name, :name)',
    ExpressionAttributeNames: {
        "#name": 'name',
    },
    ExpressionAttributeValues: {
        ":entityType": "user",
        ":name": 'J',
    }
};
execute('Find users by name begins_with:', 'query', params);
