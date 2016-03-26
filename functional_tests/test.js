/* global casper */
'use strict';

casper.test.begin('our local server can be opened', 1, function(test) {
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
    test.assertField('#new-todo-description', '');
    // Chris sees the todo now listed in his todos
    // Chris selects the field, and types in 'call mom'
    // Chris clicks a button (add todo)
    // Chris now sees a list entry for his todo
    casper.test.fail('Fix this test!');
    // Chris closes the page
    // Chris reopens the page
    // Chris sees the todo he previously entered
  }).run(function() {
    test.done();
  });
});
