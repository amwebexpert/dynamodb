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

params = {
    TableName: 'authorization_local',
};
dynamodb.deleteTable(params, callbackHandler);
