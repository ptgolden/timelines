"use strict";

var Backbone = require('../backbone')
  , database = require('../database')

/*
 * Item consists of:
 *   - collectionID
 *   - title
 *   - dateStartInt
 *   - dateEndInt
 *   - itemType
 *   - (key, val) metadata pairs
 */

module.exports = Backbone.Model.extend({
  database: database,
  storeName: 'items',
  defaults: {
    dateEndInt: null
  },
  validate: function (attrs, options) {
    if (!attrs.title) return "must have a title."
  }
});
