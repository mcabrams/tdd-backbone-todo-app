# TDD Backbone Todo App

A [Backbone](http://backbonejs.org/) Todo app built using [TDD](https://en.wikipedia.org/wiki/Test-driven_development).

Also includes usage of [Docker](https://www.docker.com/), [gulp](http://gulpjs.com/),
[mocha](https://mochajs.org/), [chai](http://chaijs.com/), [casperjs](http://casperjs.org/),
and [browserify](http://browserify.org/).

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
- To run functional tests run `npm run functional` in docker container.
