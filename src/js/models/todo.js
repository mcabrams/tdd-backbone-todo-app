'use strict';

var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');

var Todo = Backbone.Model.extend({
  localStorage: new Backbone.LocalStorage('TodoCollection'),

  defaults: {
    completed: false,
    description: ''
  },

  toggle: function() {
    this.save({
      completed: !this.get('completed')
    });
  }
});

module.exports = Todo;
