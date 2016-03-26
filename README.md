# TDD Backbone Todo App

## Setup

1. Install docker
2. Run `docker pull mcabrams/backbone-playground`
3. Run `./start.sh`
4. Open docker container bash (`docker exec -it web bash`) to run following commands:
    1. `npm install`
    2. `gulp build`
6. Open `dist/index.html` in browser of your choice

## Tests

- To run unit tests run `npm test` in docker container.
- To run functional tests run `npm run functional-test` in docker container.
