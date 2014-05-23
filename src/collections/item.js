"use strict";

var Backbone = require('../backbone')
  , Item = require('../models/item')
  , database = require('../database')

module.exports = Backbone.Collection.extend({
  database: database,
  storeName: 'items',
  model: Item,
  initialize: function (models, options) {
    this.itemCollection = options.itemCollection;
    this.project = options.project;
  }
});
