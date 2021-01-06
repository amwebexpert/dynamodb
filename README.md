# DynamoDB POC

## Setup

### Step 1
    npm install

### Step 2 Download jar from AWS and uncompress

Download link:
    https://s3.us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.tar.gz

Unzip it inside this project, this normaly creates these artifacts:
    /DynamoDBLocal_lib
    /third_party_licenses
    DynamoDBLocal.jar
    LICENSE.txt
    README.txt

### Step 3 Starting local instance of DynamoDB
    ./startDynamoDB.sh

then test it like this:
    aws dynamodb list-tables --endpoint-url http://localhost:8000
or open the shell UI:
    http://localhost:8000/shell/

Examples Web shell commands:
- type 'list' + control-space this can show/insert code snipets like:


### Some commandline examples:

    aws dynamodb list-tables --endpoint-url http://localhost:8000


### Step 4 Starting dynamodb-admin GUI

    npm run admin-console
then open browser at http://localhost:8001/

### Step 5 Create table, add data and execute queries

    node src/deleteTable.js
    node src/createTable.js
    node src/loadData.js
    node src/queries-account.js
    node src/queries-team.js
    node src/queries-user.js


## DynamoDB SDK usage of DocumentClient

    https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-document-client.html
    https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html#Query.KeyConditionExpressions
    https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.OperatorsAndFunctions.html

## Design considerations
    - UUID vs other id
    - https://stackoverflow.com/a/44297379/704681 (for case insensitive queries, like nameSearch at insert time or Elastic Search)
    - Cost considerations:
        - fetching users/accounts by using filtering like `contains` which causes table scanning
        - indexes with `ALL` instead of KEYS_ONLY, INCLUDE
    - Version for "optimism looking" @DynamoDBVersionAttribute annotation
    - Cashing using Spring cache annotations

