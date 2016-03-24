'use strict';

var jQuery = require('jquery'),
    Backbone = require('backbone'),
    _ = require('lodash');

Backbone.$ = jQuery;

var TodoView = require('./todo-view'),
    todosTemplate = require('../../templates/todos.html');

var TodosView = Backbone.View.extend({
  tagname: 'div',

  template: _.template(todosTemplate),

  render: function() {
    this.$el.html(this.template());
    this.addAllTodos();
    return this;
  },

  initialize: function(options) {
    this.todos = options.todos;
  },

  addOneTodo: function(todo) {
    var todoView = new TodoView(todo);
    this.$('#todo-list').append(todoView.render().el);
  },

  addAllTodos: function() {
    this.$('#todo-list').empty();
    this.todos.each(this.addOneTodo, this);
  },

  createTodo: function(todo) {
    this.todos.create(todo);
  }
});

module.exports = TodosView;
