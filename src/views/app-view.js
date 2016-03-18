'use strict';

var jQuery = require('jquery');
var Backbone = require('backbone');
Backbone.$ = jQuery;

var AppView = Backbone.View.extend({
  el: '#app-view',

  initialize: function(options) {
    this.todos = options.todos;
  },

  createTodo: function(todo) {
    this.todos.create(todo);
  }
});

module.exports = AppView;
