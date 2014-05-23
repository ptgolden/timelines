var dehumanizeDate = require('dehumanize-date')
  , EditItemView = require('./generic/edit_item')
  , template = require('../templates/edit_item.html')
  , parseDate = require('../utils/parse_date')

module.exports = EditItemView.extend({
  constructor: function () {
    this.template = template;
    EditItemView.apply(this, arguments);
  },
  bindings: {
    '#item-title': 'title',
    '#item-start-date': {
      observe: 'dateStartInt',
      getVal: function ($el, evt, options) {
        var parsed = parseDate($el.val());
        return parsed && parsed.str;
      }
    },
    '#item-end-date': {
      observe: 'dateEndInt',
      getVal: function ($el, evt, options) {
        var parsed = parseDate($el.val());
        return parsed && parsed.str;
      }
    }
  }
});
