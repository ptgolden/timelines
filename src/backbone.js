"use strict";

var Backbone = require('backbone')
  , $ = require('jquery')
  , BackboneIndexedDB = require('backbone-indexeddb')

Backbone.$ = $;
Backbone.sync = BackboneIndexedDB.sync;
require('backbone.stickit');

module.exports = Backbone;
