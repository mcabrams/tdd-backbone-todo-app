'use strict';

var assert = require('chai').assert,
    $ = require('jquery'),
    sinon = require('sinon');

var Todo = require('../../src/js/models/todo'),
    TodosView = require('../../src/js/views/todos-view'),
    TodoCollection = require('../../src/js/collections/todo-collection');

var ENTER_KEY = 13;

suite('TodosView', function() {
  test('can create todoCollection if none given', function() {
    var todosView = new TodosView();
    assert.instanceOf(todosView.todos, TodoCollection);
  });

  test('can create a todo', function() {
    var todoCollection = new TodoCollection();
    var todosView = new TodosView({todos: todoCollection});

    todosView.createTodo({});

    assert.equal(todoCollection.length, 1);
  });

  test('can add one todo', function() {
    var todosView = new TodosView();
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

  test('can extract todo description', function() {
    var todosView = new TodosView();
    todosView.render();
    todosView.$el.find('#new-todo-description').val('Buy groceries');
    assert.equal(todosView.extractTodoDescription(), 'Buy groceries');
  });

  test('can create new todo attributes', function() {
    var todosView = new TodosView();
    assert.deepEqual(todosView.newTodoAttributes(), {
      description: '',
      completed: false
    });
  });

  test('can create new todo on submit', function() {
    var createOnSubmitSpy = sinon.spy(TodosView.prototype, 'createOnSubmit');
    var todosView = new TodosView();
    todosView.render();

    var mockSubmitEvent = new $.Event('submit'),
        preventDefaultSpy = sinon.spy(mockSubmitEvent, 'preventDefault');

    todosView.$el.find('#new-todo-form').trigger(mockSubmitEvent);

    assert.isTrue(preventDefaultSpy.calledOnce);
    assert.isTrue(createOnSubmitSpy.calledOnce);
    TodosView.prototype.createOnSubmit.restore();
  });

  test('submitOnEnter called on keydown in new todo', function() {
    var submitOnEnterSpy = sinon.spy(TodosView.prototype, 'submitOnEnter');
    var todosView = new TodosView();
    todosView.render();

    var keypressEvent = new $.Event('keypress');
    todosView.$el.find('#new-todo-description').trigger(keypressEvent);

    assert.isTrue(submitOnEnterSpy.calledOnce);
    TodosView.prototype.submitOnEnter.restore();
  });

  test('submitOnEnter creates todo if enter key pressed', function() {
    var createOnSubmitSpy = sinon.spy(TodosView.prototype, 'createOnSubmit');
    var todosView = new TodosView();
    todosView.render();

    var enterKeypressEvent = new $.Event('keypress', {which: ENTER_KEY});

    todosView.submitOnEnter(enterKeypressEvent);
    assert.isTrue(createOnSubmitSpy.calledOnce);
    TodosView.prototype.createOnSubmit.restore();
  });

  test('submitOnEnter prevents default if enter pressed', function() {
    var todosView = new TodosView();
    todosView.render();

    var mockEnterKeypressEvent = new $.Event('keypress', {which: ENTER_KEY}),
        preventDefaultSpy = sinon.spy(mockEnterKeypressEvent, 'preventDefault');

    todosView.submitOnEnter(mockEnterKeypressEvent);

    assert.isTrue(preventDefaultSpy.calledOnce);
  });

  test('submitOnEnter does not prevent default if non-enter key pressed', function() {
    var todosView = new TodosView();
    todosView.render();

    var mockKeypressEvent = new $.Event('keypress'),
        preventDefaultSpy = sinon.spy(mockKeypressEvent, 'preventDefault');

    todosView.submitOnEnter(mockKeypressEvent);

    assert.isTrue(preventDefaultSpy.notCalled);
  });

  test('submitOnEnter clears field if enter key pressed', function() {
    var todosView = new TodosView();
    todosView.render();

    var enterKeypressEvent = new $.Event('keypress', {which: ENTER_KEY});

    todosView.$el.find('#new-todo-description').val('Pet the dog');
    todosView.submitOnEnter(enterKeypressEvent);
    assert.equal(todosView.$el.find('#new-todo-description').val(), '');
  });

  test('updating collection re-renders view', function() {
    var renderSpy = sinon.spy(TodosView.prototype, 'render');
    var todosView = new TodosView();
    todosView.render();

    todosView.todos.trigger('update');
    assert.equal(renderSpy.callCount, 2); // Once initially, once for updated
                                          // collection.
    TodosView.prototype.render.restore();
  });
});
