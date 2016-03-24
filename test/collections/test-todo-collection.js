'use strict';

var assert = require('chai').assert;

var Todo = require('../../src/js/models/todo'),
    TodoCollection = require('../../src/js/collections/todo-collection');

suite('TodoCollection', function() {
  test('contains the Todo model class', function() {
    var todoCollection = new TodoCollection();
    assert.deepEqual(todoCollection.model, Todo);
  });
});
