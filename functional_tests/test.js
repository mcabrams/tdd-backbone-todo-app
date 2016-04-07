/* global casper */
'use strict';

casper.test.begin('our local server can be opened', 15, function(test) {
  // Chris visits the todo list site
  casper.start('http://localhost:3003', function() {
    test.assertResourceExists('bundle.js');
    test.assertResourceExists('main.css');
    // Chris sees the main app view
    test.assertExists('#app-view');

    // Chris sees the header is red (style smoketest)
    test.assertEvalEquals(function() {
      var todolist = document.getElementsByClassName('todo-list')[0];
      return 'rgb(236, 238, 239)' === getComputedStyle(todolist, null).backgroundColor;
    }, true);

    // Chris sees the header says Todo App
    test.assertSelectorHasText('h1', 'Todo App');
    // Chris sees no todos listed
    test.assertElementCount('#todo-list li', 0);
    // Chris sees a field where he can enter a todo
    test.assertExists('#new-todo-description');
  })
  .then(function() {
    // Chris enters a description for his todo and presses enter
    this.sendKeys('#new-todo-description', 'Buy deodorant');
    this.sendKeys('#new-todo-description', casper.page.event.key.Enter);
    // Chris see the field is now empty
    test.assertField('description', '');
    // Chris sees the todo now listed in his todos
    test.assertSelectorHasText('#todo-list li', 'Buy deodorant');
    test.assertElementCount('#todo-list li', 1);

    // Chris enters a description for a new todo and presses enter
    this.sendKeys('#new-todo-description', 'Buy chocolate');
    this.sendKeys('#new-todo-description', casper.page.event.key.Enter);
    // Chris see the field is now empty
    test.assertField('description', '');
    // Chris sees the todo now listed in his todos
    test.assertSelectorHasText('#todo-list li', 'Buy chocolate');

    // Chris buys deodorant and checks it as being done
    this.mouse.click('.completion-checkbox');
    // Chris sees the todo has been completed
    test.assertExists('#todo-list li input[type=checkbox]:checked');
    // Chris removes the deodorant todo
    this.mouse.click('.clear-button');
    // Chris sees the deodorant todo is gone
    test.assertElementCount('#todo-list li', 1);
    // Chris closes the page
    // casper.page.close();
    // casper.page = require('webpage').create();

    // Chris reopens the page
  }).thenOpen('http://localhost:3003', function() {
    // Chris sees the todo he previously entered and did not remove
    test.assertSelectorHasText('#todo-list li', 'Buy chocolate');
  }).run(function() {
    test.done();
  });
});
