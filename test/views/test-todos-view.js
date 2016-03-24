'use strict';

var assert = require('chai').assert;

var Todo = require('../../src/js/models/todo');
var TodosView = require('../../src/js/views/todos-view');
var TodoCollection = require('../../src/js/collections/todo-collection');

suite('TodosView', function() {
  test('can create a todo', function() {
    var todoCollection = new TodoCollection();
    var todosView = new TodosView({todos: todoCollection});

    todosView.createTodo({});

    assert.equal(todoCollection.length, 1);
  });

  test('can add one todo', function() {
    var todoCollection = new TodoCollection();
    var todosView = new TodosView({todos: todoCollection});
    var todo = new Todo();
    todosView.render();
    todosView.addOneTodo(todo);

    assert.equal(todosView.$el.find('li').length, 1);
  });

  test('can add all todos', function() {
    var todo1 = new Todo();
    var todo2 = new Todo();
    var todoCollection = new TodoCollection([todo1, todo2]);
    var todosView = new TodosView({todos: todoCollection});
    todosView.render();
    todosView.addAllTodos();

    assert.equal(todosView.$el.find('li').length, 2);
  });

  test('displays all todos on render', function() {
    var todo1 = new Todo();
    var todo2 = new Todo();
    var todoCollection = new TodoCollection([todo1, todo2]);
    var todosView = new TodosView({todos: todoCollection});
    todosView.render();

    assert.equal(todosView.$el.find('li').length, 2);
  });
});
