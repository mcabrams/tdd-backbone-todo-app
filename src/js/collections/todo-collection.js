'use strict';

var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');

var Todo = require('../models/todo');

var TodoCollection = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage('TodoCollection'),
  model: Todo
});

module.exports = TodoCollection;
