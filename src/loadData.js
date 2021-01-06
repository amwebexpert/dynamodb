const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({ region: 'local', endpoint: 'http://localhost:8000' });
var documentClient = new AWS.DynamoDB.DocumentClient();

// Application users sample
// -----------------------------------
console.log('Importing appUsers:');
const appUsers = JSON.parse(fs.readFileSync('src/data/appUsers.json', 'utf8'));

appUsers.forEach(function (appUser) {
    console.log(`\ - ${appUser.email}`);

    const uuid = appUser.uuid;
    const params = {
        TableName: 'authorization_local',
        Item: {
            pkey: `user:${uuid}`,
            skey: `metadata:${uuid}`,
            firstName: appUser.firstName,
            lastName: appUser.lastName,
            email: appUser.email,
            name: `${appUser.firstName} ${appUser.lastName}`,
            entityType: 'appUser'
        }
    };

    documentClient.put(params, function (err, _data) {
        if (err) {
            console.error(err);
        }
    });
});

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
            campaigns: account.campaigns,
            entityType: 'account'
        }
    };

    documentClient.put(params, function (err, _data) {
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
            subjects: team.subjects,
            entityType: 'team'
        }
    };

    documentClient.put(params, function (err, _data) {
        if (err) {
            console.error(err);
        }
    });
});

// TeamMembers sample
// -----------------------------------
console.log('Importing team member elements:');
const teamMembers = JSON.parse(fs.readFileSync('src/data/teamMembers.json', 'utf8'));

teamMembers.forEach(function (teamMember, i) {
    console.log(`\ - membership ${(i+1)}: ${teamMember.note}`);

    const accountUuid = teamMember.accountUuid;
    const teamUuid = teamMember.teamUuid;
    const userUuid = teamMember.userUuid;
    const params = {
        TableName: 'authorization_local',
        Item: {
            pkey: `account:${accountUuid}:team:${teamUuid}`,
            skey: `user:${userUuid}`,
            privileges: teamMember.privileges,
            note: teamMember.note,
            entityType: 'teamMembership',
            memberSince: new Date().toISOString()
        }
    };

    documentClient.put(params, function (err, _data) {
        if (err) {
            console.error(err);
        }
    });
});
