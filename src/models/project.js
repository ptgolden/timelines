"use strict";

var Backbone = require('../backbone')
  , database = require('../database')
  , ItemCollection = require('../collections/collection')

module.exports = Backbone.Model.extend({
  database: database,
  storeName: 'projects',
  constructor: function () {
    this.itemCollections = new ItemCollection([], { project: this });
    Backbone.Model.apply(this, arguments);
  }
});
