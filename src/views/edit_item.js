var EditItemView = require('./generic/edit_item')
  , template = require('../templates/edit_item.html')

module.exports = EditItemView.extend({
  constructor: function () {
    this.template = template;
    EditItemView.apply(this, arguments);
  },
  bindings: {
    '#item-title': 'title'
  }
});
