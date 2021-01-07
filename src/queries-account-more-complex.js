const AWS = require('aws-sdk');

AWS.config.update({ region: 'local', endpoint: 'http://localhost:8000' });
const dynamodb = new AWS.DynamoDB();

async function listAccountMembers() {
    console.log('Find all members of an account');
    console.log('--------------------------------------------------------------------------------');
    let params;
    let data;

    try {
        // Step 1 - find all teams
        params = {
            TableName: 'authorization_local',
            KeyConditionExpression: 'pkey = :pkey and begins_with(skey, :skey)',
            ExpressionAttributeValues: {
                ":pkey": { 'S': 'account:acc_id_1' },
                ":skey": { 'S': 'team:' },
            }
        };
        data = await dynamodb.query(params).promise();

        // Step 2 - iterate teams
        const userIDs = new Set();
        for (let i = 0; i < data.Items.length; i++) {
            const team = data.Items[i];
            await collectTeamMembers(team, userIDs);
        }
        console.log(userIDs);

    } catch (err) {
        console.log("Failure", err);
    }
}

async function collectTeamMembers(team, userIDs) {
    try {

        const membershipPK = `${team.pkey.S}:${team.skey.S}`;

        params = {
            TableName: 'authorization_local',
            KeyConditionExpression: 'pkey = :pkey',
            ExpressionAttributeValues: {
                ":pkey": { 'S': membershipPK },
            }
        };
        data = await dynamodb.query(params).promise();

        // Display info on console
        console.log(team.name, membershipPK);
        // console.log(data.Items.map(user => user.note.S));
        console.log('\t ==> ' + data.Items.map(user => user.skey.S).join(', '));
        data.Items.forEach(user => userIDs.add(user.skey.S));

    } catch (err) {
        console.log("Failure", err);
    }
}

listAccountMembers();
