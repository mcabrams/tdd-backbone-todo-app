/* global casper */
'use strict';

casper.test.begin('our local server can be opened', 8, function(test) {
  // Chris visits the todo list site
  casper.start('http://localhost:3003', function() {
    test.assertResourceExists('bundle.js');
    // Chris sees the main app view
    test.assertExists('#app-view');
    test.assertSelectorHasText('h1', 'Todo App');
    // Chris sees a field where he can enter a todo
    test.assertExists('#new-todo-description');
    // Chris enters a description for his todo and presses enter
    this.sendKeys('#new-todo-description', 'Buy deodorant');
    this.sendKeys('#new-todo-description', casper.page.event.key.Enter);
    // Chris see the field is now empty
    test.assertField('description', '');
    // Chris sees the todo now listed in his todos
    test.assertSelectorHasText('#todo-list li', 'Buy deodorant');
    // Chris buys deodorant and checks it as being done
    this.mouse.click('.completion-checkbox');
    // Chris sees the todo has been completed
    test.assertExists('#todo-list li input[type=checkbox]:checked');
    // Chris removes the deodorant todo
    this.mouse.click('.clear-button');
    // Chris sees the deodorant todo is gone
    test.assertDoesntExist('#todo-list li');
    // Chris closes the page
    // Chris reopens the page
    // Chris sees the todo he previously entered
  }).run(function() {
    test.done();
  });
});
