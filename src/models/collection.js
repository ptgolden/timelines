"use strict";

var _ = require('underscore')
  , Backbone = require('../backbone')
  , database = require('../database')
  , Items = require('../collections/item')

module.exports = Backbone.Model.extend({
  database: database,
  storeName: 'collections',
  constructor: function () {
    this.items = new Items([]);
    Backbone.Model.apply(this, arguments);
  },
  fetchItems: function (options) {
    var that = this;
    options = _.extend({
      conditions: { collectionID: that.get('id') }
    }, options)
    return this.items.fetch(options);
  }
});
