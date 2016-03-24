var assert = require('chai').assert;

var AppView = require('../../src/js/views/app-view');
var TodoCollection = require('../../src/js/collections/todo-collection');

suite('AppView', function() {
  test('can create a todo', function() {
    var todoCollection = new TodoCollection();
    var appView = new AppView({todos: todoCollection});

    appView.createTodo({});

    assert.equal(todoCollection.length, 1)
  });
});
