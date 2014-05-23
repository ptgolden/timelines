"use strict";

var Backbone = require('../backbone')
  , $ = require('jquery')
  , ItemCollection = require('../collections/item')
  , Project = require('../models/project')

module.exports = Backbone.View.extend({
  bindings: {
    '#collection-name': 'name',
    '#collection-description': 'description'
  },
  initialize: function () {
    var that = this
      , project = this.project = new Project()
      , modelPromise = this.model.fetch()
      , projectPromise
      , itemsPromise

    projectPromise = modelPromise.then(function () {
      that.project.set('id', that.model.get('projectID'));
      return that.project.fetch();
    });

    itemsPromise = modelPromise.then(function () {
      that.items = new ItemCollection([], { itemCollection: that.model, project: project })
      return that.items.fetch({
        conditions: { collectionID: that.model.get('id') }
      });
    });

    $.when(modelPromise, itemsPromise, projectPromise).then(that.render.bind(that));
  },
  render: function () {
    var that = this
      , ItemsView = require('./all_items')
      , template = require('../templates/collection.html')

    this.$el.html(template({ project: that.project, items: that.items }));
    this.itemsView = new ItemsView({
      el: '#collection-items',
      collection: this.items
    });

    this.stickit();
  }
});
