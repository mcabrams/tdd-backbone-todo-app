'use strict';

var Backbone = require('backbone');

var Todo = Backbone.Model.extend({
  defaults: {
    completed: false,
    description: ''
  }
});

module.exports = Todo;
