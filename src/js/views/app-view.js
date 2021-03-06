'use strict';

var jQuery = require('jquery'),
    Backbone = require('backbone'),
    _ = require('lodash');

Backbone.$ = jQuery;

var appTemplate = require('../../templates/app.html'),
    TodoCollection = require('../collections/todo-collection'),
    TodosView = require('./todos-view');

var AppView = Backbone.View.extend({
  el: '#app-view',

  template: _.template(appTemplate),

  initialize: function() {
    this.render();
  },

  render: function() {
    var todoCollection = new TodoCollection(),
        todosView = new TodosView({todos: todoCollection});
    this.$el.html(this.template());
    this.$el.append(todosView.render().el);
    return this;
  }
});

module.exports = AppView;
