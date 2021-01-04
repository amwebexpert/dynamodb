const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({ region: 'local', endpoint: 'http://localhost:8000' });
var docClient = new AWS.DynamoDB.DocumentClient();

// Accounts sample
// -----------------------------------
console.log('Importing accounts:');
const accounts = JSON.parse(fs.readFileSync('src/data/accounts.json', 'utf8'));

accounts.forEach(function (account) {
    console.log(`\ - ${account.name}`);

    const uuid = account.uuid;
    const params = {
        TableName: 'authorization_local',
        Item: {
            pkey: `account:${uuid}`,
            skey: `metadata:${uuid}`,
            name: account.name,
            campaigns: account.campaigns
        }
    };

    docClient.put(params, function (err, _data) {
        if (err) {
            console.error(err);
        }
    });
});

// Teams sample
// -----------------------------------
console.log('Importing teams:');
const teams = JSON.parse(fs.readFileSync('src/data/teams.json', 'utf8'));

teams.forEach(function (team) {
    console.log(`\ - ${team.name}`);

    const accountUuid = team.accountUuid;
    const uuid = team.uuid;
    const params = {
        TableName: 'authorization_local',
        Item: {
            pkey: `account:${accountUuid}`,
            skey: `team:${uuid}`,
            name: team.name,
            subjects: team.subjects
        }
    };

    docClient.put(params, function (err, _data) {
        if (err) {
            console.error(err);
        }
    });
});
