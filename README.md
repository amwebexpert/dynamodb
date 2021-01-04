## Starting local instance of DynamoDB
    ./startDynamoDB.sh

then test it like this:
    aws dynamodb list-tables --endpoint-url http://localhost:8000
or open the shell UI:
    http://localhost:8000/shell/

### Some commandline examples:

    aws dynamodb list-tables --endpoint-url http://localhost:8000


## Starting DynamoDB admin GUI

    npm run admin-console
then open browser at http://localhost:8001/

## Create table and data using Node.js

    node src/createTable.js
    node src/loadData.js
