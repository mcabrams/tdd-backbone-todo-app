'use strict';

var jQuery = require('jquery'),
    Backbone = require('backbone'),
    _ = require('lodash');

Backbone.$ = jQuery;

var TodoView = require('./todo-view'),
    TodoCollection = require('../collections/todo-collection'),
    todosTemplate = require('../../templates/todos.html');

var ENTER_KEY = 13;

var TodosView = Backbone.View.extend({
  tagName: 'div',
  className: 'todo-list',

  template: _.template(todosTemplate),

  events: {
    'keypress #new-todo-description': 'submitOnEnter',
    'submit #new-todo-form': 'createOnSubmit'
  },

  render: function() {
    this.$el.html(this.template());
    this.addAllTodos();
    return this;
  },

  initialize: function(options) {
    options = options || {};
    this.todos = options.todos || new TodoCollection();
    this.listenTo(this.todos, 'all', this.render);

    this.todos.fetch();
  },

  addOneTodo: function(todo) {
    var todoView = new TodoView(todo);
    this.$('#todo-list').append(todoView.render().el);
  },

  addAllTodos: function() {
    this.$('#todo-list').empty();
    this.todos.each(this.addOneTodo, this);
  },

  extractTodoDescription: function() {
    return this.$('#new-todo-description').val() || '';
  },

  newTodoAttributes: function() {
    return {
      description: this.extractTodoDescription(),
      completed: false
    };
  },

  submitOnEnter: function(event) {
    if (event.which != ENTER_KEY) {
      return;
    }

    event.preventDefault();

    this.$('#new-todo-form').submit();
  },

  createOnSubmit: function(event) {
    event.preventDefault();

    var newAttributes = this.newTodoAttributes();
    this.createTodo(newAttributes);
  },

  createTodo: function(todo) {
    this.todos.create(todo);
  }
});

module.exports = TodosView;
