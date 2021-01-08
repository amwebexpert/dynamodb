const DynamoDbLocal = require('dynamodb-local');
const dynamoLocalPort = 8000;

DynamoDbLocal.launch(dynamoLocalPort, null, ['-sharedDb'])
    .then(function () {
        console.log(`DynamoDb local started and listening at http://localhost:${dynamoLocalPort}`);
        console.log('Press [Control-C] to stop');
    });
