'use strict';

var jQuery = require('jquery'),
    Backbone = require('backbone'),
    _ = require('lodash');

Backbone.$ = jQuery;

var todoTemplate = require('../../templates/todo.html');

var TodoView = Backbone.View.extend({
  initialize: function(todo) {
    this.todo = todo;
  },

  events: {
    'change .completion-status': 'toggle'
  },

  template: _.template(todoTemplate),

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  toggle: function() {
    this.todo.toggle();
  }
});

module.exports = TodoView;
