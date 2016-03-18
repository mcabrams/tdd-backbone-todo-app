var assert = require('chai').assert;

var AppView = require('../../src/views/app-view');
var TodoCollection = require('../../src/collections/todo-collection');

suite('AppView', function() {
  test('can create a todo', function() {
    console.log('can create');
    var todoCollection = new TodoCollection();
    var appView = new AppView({todos: todoCollection});

    appView.createTodo({});

    assert.equal(todoCollection.length, 1)
  });
});
