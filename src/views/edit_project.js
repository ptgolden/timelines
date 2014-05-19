"use strict";

var EditItemView = require('./generic/edit_item')
  , template = require('../templates/edit_project.html')

module.exports = EditItemView.extend({
  constructor: function () {
    this.template = template;
    EditItemView.apply(this, arguments);
  },
  bindings: {
    '#project-name': 'name',
    '#project-description': 'description'
  }
});
