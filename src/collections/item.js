"use strict";

var Backbone = require('../backbone')
  , Item = require('../models/item')
  , database = require('../database')

function dateToTimestamp(datestr, addDay) {
  var date = new Date(0)
    , dateParts = datestr.split('-')
    , year = dateParts[0]
    , month = dateParts[1]
    , day = dateParts[2]
    , timestamp

  date.setFullYear(parseInt(year, 10));

  if (month && month !== '00') date.setMonth(parseInt(month, 10) - 1);
  if (day && day !== '00') date.setDate(parseInt(day, 10));

  timestamp = date.getTime();

  if (addDay) {
    timestamp += (1 * 24 * 60 * 60 * 1000)
  }

  return timestamp;
}

module.exports = Backbone.Collection.extend({
  database: database,
  storeName: 'items',
  model: Item,
  initialize: function (models, options) {
    options = options || {};
    this.itemCollection = options.itemCollection;
    this.project = options.project;
  },
  toD3Data: function () {
    return this.map(function (item) {
      var startTime, endTime;
      startTime = dateToTimestamp(item.get('dateStartInt'))
      endTime = item.has('dateEndInt') ?
        dateToTimestamp(item.get('dateEndInt'))
        : dateToTimestamp(item.get('dateStartInt'), true);
      return {
        starting_time: startTime,
        endingTime: endTime,
        label: item.get('title'),
        id: item.get('id'),
        description: item.get('description')
      }
    })
  }
});
