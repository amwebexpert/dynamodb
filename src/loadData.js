const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({ region: 'local', endpoint: 'http://localhost:8000' });
var docClient = new AWS.DynamoDB.DocumentClient();

// Accounts sample
// -----------------------------------
console.log('Importing accounts:');
const accounts = JSON.parse(fs.readFileSync('src/accounts.json', 'utf8'));

accounts.forEach(function (account) {
    console.log(account);

    const params = {
        TableName: 'authorization_local',
        Item: {
            pkey: `account:${account.pkey}`,
            skey: `metadata:${account.pkey}`,
            name: account.name,
            campaigns: account.campaigns
        }
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log(`PutItem succeeded for ${account.name}`, data);
        }
    });
});
