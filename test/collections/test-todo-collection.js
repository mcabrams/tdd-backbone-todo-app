'use strict';

var assert = require('chai').assert;

var Todo = require('../../src/models/todo'),
    TodoCollection = require('../../src/collections/todo-collection');

suite('TodoCollection', function() {
  test('contains the Todo model class', function() {
    var todoCollection = new TodoCollection();
    assert.deepEqual(todoCollection.model, Todo);
  });
});
