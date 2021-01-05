## Setup

- Downloaded DynamoDB Local jar from AWS:
    https://s3.us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.tar.gz
- Unzip it inside this project, this normaly creates these artifacts:
    /DynamoDBLocal_lib
    /third_party_licenses
    DynamoDBLocal.jar
    LICENSE.txt
    README.txt

## Starting local instance of DynamoDB
    ./startDynamoDB.sh

then test it like this:
    aws dynamodb list-tables --endpoint-url http://localhost:8000
or open the shell UI:
    http://localhost:8000/shell/

### Some commandline examples:

    aws dynamodb list-tables --endpoint-url http://localhost:8000


## Starting dynamodb-admin GUI

    npm run admin-console
then open browser at http://localhost:8001/

## DynamoDB SDK usage of DocumentClient

    https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-document-client.html
    https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html#Query.KeyConditionExpressions
    https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.OperatorsAndFunctions.html

### Design considerations
    - https://stackoverflow.com/a/44297379/704681 (for case insensitive queries, like nameSearch at insert time or Elastic Search)
    - Cost considerations:
        - fetching users/accounts by using filtering like `contains` which causes table scanning
        - indexes with `ALL` instead of KEYS_ONLY, INCLUDE
        - 

## Create table and data using Node.js

    node src/createTable.js
    node src/loadData.js
