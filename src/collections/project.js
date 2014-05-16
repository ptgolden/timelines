"use strict";

var Backbone = require('../backbone')
  , Project = require('../models/project')
  , database = require('../database')

module.exports = Backbone.Collection.extend({
  database: database,
  storeName: 'projects',
  model: Project
});
