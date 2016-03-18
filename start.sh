#!/bin/bash
# Mount current directory to /backbone in container

docker run -d -v `pwd`:/backbone -w /backbone -p 3003:3003 --name web mcabrams/backbone-playground

# Install npm packages
docker exec web npm install
