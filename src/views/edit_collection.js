"use strict";

var EditItemView = require('./generic/edit_item')
  , template = require('../templates/edit_collection.html')

module.exports = EditItemView.extend({
  constructor: function () {
    this.template = template;
    EditItemView.apply(this, arguments);
  },
  bindings: {
    '#collection-name': 'name',
    '#collection-description': 'description'
  }
});
