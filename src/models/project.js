"use strict";

var Backbone = require('../backbone')
  , database = require('../database')

module.exports = Backbone.Model.extend({
  database: database,
  storeName: 'projects'
});
