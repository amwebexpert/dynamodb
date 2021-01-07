docker --version

echo "Pulling dynamodb-manager from Docker Hub https://hub.docker.com/r/taydy/dynamodb-manager/"
docker pull taydy/dynamodb-manager

echo "Stopping dynamodb-manager (if running)"
docker stop dynamodb-manager || true

echo "Running dynamodb-manager container"
docker run -it --rm -d -p8002:80 --name dynamodb-manager taydy/dynamodb-manager:latest
docker ps

echo "________________________________________________________________________________"
echo "Docker container attached to localhost. Manager app available at"
echo "http://localhost:8002"
echo "________________________________________________________________________________"
