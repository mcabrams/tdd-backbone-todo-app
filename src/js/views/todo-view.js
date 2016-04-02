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
    'change .completion-checkbox': 'toggle',
    'click .clear-button': 'clear'
  },

  template: _.template(todoTemplate),

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  toggle: function() {
    this.todo.toggle();
  },

  clear: function() {
    this.todo.destroy();
  }
});

module.exports = TodoView;
