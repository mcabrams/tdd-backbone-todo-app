'use strict';

var chai = require('chai');
chai.config.includeStack = true;
var assert = chai.assert;


var Todo = require('../../src/js/models/todo');

suite('Todo', function() {
  test('looks like a backbone model', function() {
    var todo = new Todo();
    assert.isFunction(todo.get);
    assert.isFunction(todo.set);
  });

  test('can initialize with completed attribute', function() {
    var todo = new Todo({completed: true});
    assert.isTrue(todo.get('completed'));
  });

  test('has a default for completed attribute', function() {
    var todo = new Todo();

    assert.equal(todo.get('completed'), false);
  });

  test('has a default for description attribute', function() {
    var todo = new Todo();

    assert.equal(todo.get('description'), '');
  });

  test('can toggle completion', function() {
    var todo = new Todo({completed: false});
    todo.toggle();
    assert.isTrue(todo.get('completed'));
  });
});
