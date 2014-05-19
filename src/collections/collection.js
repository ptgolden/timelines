"use strict";

var Backbone = require('../backbone')
  , Collection = require('../models/collection')
  , database = require('../database')

module.exports = Backbone.Collection.extend({
  database: database,
  storeName: 'collections',
  model: Collection,
  initialize: function (models, options) {
    this.project = options.project;
  }
});
