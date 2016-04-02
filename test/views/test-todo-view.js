'use strict';

var chai = require('chai'),
    assert = chai.assert,
    sinon = require('sinon');

chai.config.includeStack = true;

var Todo = require('../../src/js/models/todo'),
    TodoView = require('../../src/js/views/todo-view');

suite('TodoView', function() {
  test('can render a todo', function() {
    var todo = new Todo(),
        todoView = new TodoView(todo);

    todoView.render();
    assert.equal(todoView.$el.find('li').length, 1);
  });

  test('renders completed todo as checked', function() {
    var todo = new Todo({completed: true}),
        todoView = new TodoView(todo);

    todoView.render();
    assert.equal(todoView.$el.find('.completion-checkbox').attr('checked'), 'checked');
  });

  test('renders todo with todo description', function() {
    var description = 'Get the milk',
        todo = new Todo({description: description}),
        todoView = new TodoView(todo);

    todoView.render();
    assert.include(todoView.$el.find('li').text(), description);
  });

  test('can toggle a todo', function() {
    var toggleSpy = sinon.spy(TodoView.prototype, 'toggle');
    var todo = new Todo({completed: false}),
        todoView = new TodoView(todo);

    todoView.render();
    todoView.$el.find('.completion-checkbox').change();
    assert.isTrue(toggleSpy.calledOnce);
    TodoView.prototype.toggle.restore();
  });

  test('can destroy todo', function() {
    var destroySpy = sinon.spy(Todo.prototype, 'destroy'),
        todo = new Todo({completed: false});
    todo.save();

    var todoView = new TodoView(todo);
    todoView.clear();

    assert.isTrue(destroySpy.calledOnce);
    Todo.prototype.destroy.restore();
  });

  test('clear called on remove click', function() {
    var clearSpy = sinon.spy(TodoView.prototype, 'clear');
    var todo = new Todo({completed: false}),
        todoView = new TodoView(todo);

    todoView.render();
    todoView.$el.find('.clear-button').trigger('click');

    assert.isTrue(clearSpy.calledOnce);
    TodoView.prototype.clear.restore();
  });
});
