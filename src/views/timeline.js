"use strict";

var _ = require('underscore')
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
    var that = this;

    this.$el.html('');

    var chart
      , svg = d3.select('#' + this.$el.attr('id')).append('svg').attr('width', 1000)
      , data = this.getData()

    var times = _.chain(data).pluck('times').flatten().value()
      , beg = _.chain(times).pluck('starting_time').min().value()
      , end = _.chain(times).pluck('endingTime').max().value()

    beg = new Date(beg);
    if (beg.getMonth < 2) {
      beg.setFullYear(beg.getFullYear() - 1);
      beg.setMonth(5);
      beg.setDate(0);
    } else {
      beg.setMonth(0);
      beg.setDate(0);
    }
    end = new Date(end);
    end.setFullYear(end.getFullYear() + 1);
    end.setMonth(5);
    end.setDate(0);

    chart = d3.timeline()
      .width(2000)
      .orient('top')
      .beginning(beg.getTime())
      .ending(end.getTime())
      .tickFormat({
        format: d3.time.format('%b %Y'),
        tickTime: d3.time.months,
        tickInterval: 3,
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
      .itemMargin(100);
    svg.datum(data).call(chart);
    svg.attr('width', 1000);

    this.$('circle[id^="timelineItem"]').tooltip({
      title: function () {
        return '<h5>' + this.__data__.label + '</h5>' + '<div>' + this.__data__.description + '</div>';
      },
      html: true,
      container: 'body'
    });

    d3.selectAll('svg > g > text')
      .attr('dy', function (d, i) { 
        return i % 2 ? 3 : -25;
      })
      .attr('transform', function (d, i) {
        var angle = i % 2 ? 10 : -10
          , aboutx = this.getAttribute('x')
          , abouty = this.getAttribute('y')

        return 'rotate(' + angle + ',' + aboutx + ',' + abouty + ')';
      })

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
