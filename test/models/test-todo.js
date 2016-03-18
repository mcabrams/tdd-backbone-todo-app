'use strict';

var assert = require('chai').assert;

var Todo = require('../../src/models/todo');

suite('Todo', function() {
  test('looks like a backbone model', function() {
    var todo = new Todo();
    assert.isFunction(todo.get);
    assert.isFunction(todo.set);
  });

  test('has a default for completed attribute', function() {
    var todo = new Todo();

    assert.equal(todo.get('completed'), false);
  });

  test('has a default for description attribute', function() {
    var todo = new Todo();

    assert.equal(todo.get('description'), '');
  });
});
