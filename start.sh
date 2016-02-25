#!/bin/bash
# Mount current directory to /backbone in container

docker run -d -v `pwd`:/backbone -w /backbone --name web mcabrams/backbone-playground tail -f /dev/null

# Install npm packages
docker exec web npm install
