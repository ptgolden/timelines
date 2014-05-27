"use strict";

var $ = require('jquery')
  , Backbone = require('../backbone')
  , d3 = require('d3')
  , ItemCollections = require('../collections/collection')

require('jquery-bootstrap');

// whatever
global.d3 = d3;
require('d3-timeline');

module.exports = Backbone.View.extend({
  initialize: function () {
    this.collections = new ItemCollections([]);
    this.render();
  },
  render: function () {
    this.$el.html('');

    var chart
      , svg = d3.select('#' + this.$el.attr('id')).append('svg').attr('width', 1000)
      , data = this.getData()
      , beg = new Date(0)
      , end = new Date(0)

    beg.setFullYear(1916);
    end.setFullYear(1918);

    chart = d3.timeline()
      .width(1000)
      .orient('top')
      .beginning(beg.getTime())
      .ending(end.getTime())
      .tickFormat({
        format: d3.time.format('%b %Y'),
        tickTime: d3.time.months,
        tickInterval: 4,
        tickSize: 4
      })
      .margin({
        left: 150,
        right: 30,
        top: 30,
        bottom: 30
      })
      .display('circle')
      .stack()
      .itemMargin(30);
    svg.datum(data).call(chart);

    this.$('circle[id^="timelineItem"]').tooltip({
      title: function () {
        return this.__data__.label;
      },
      container: 'body'
    });
  },
  getData: function () {
    return this.collections.map(function (collection) {
      return {
        label: collection.get('name'),
        times: collection.items.toD3Data()
      }
    });
  },
  addCollection: function (collection) {
    var that = this;
    collection.fetchItems().then(function () {
      that.collections.add(collection);
      that.render();
    });
  },
  removeCollection: function (collection) {
    this.collections.remove(collection);
    this.render();
  }
});
