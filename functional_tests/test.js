var assert = require('chai').assert;

casper.test.begin('our local server can be opened', 1, function(test) {
  // Chris visits the todo list site
  casper.start('http://localhost:3003', function() {
    test.assertResourceExists('bundle.js');
    // Chris sees a field where he can enter a todo
    test.assertExists('#add-todo');
    // Chris selects the field, and types in 'call mom'
    // Chris clicks a button (add todo)
    // Chris now sees a list entry for his todo
    casper.test.fail('Fix this test!');
  }).run(function() {
    test.done();
  });
});
