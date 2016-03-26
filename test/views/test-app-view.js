'use strict';

var assert = require('chai').assert,
    $ = require('jquery');

var AppView = require('../../src/js/views/app-view');

suite('AppView', function() {
  test('can render todos', function() {
    var $fixture = $('<div></div>');
    $fixture.attr('id', 'app-view');
    $('body').append($fixture);

    var appView = new AppView();

    assert.equal(appView.$el.find('#todo-list').length, 1);
  });
});
