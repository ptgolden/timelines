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
      , items = new ItemCollection()
      , modelPromise = this.model.fetch()
      , projectPromise
      , itemsPromise

      projectPromise = modelPromise.then(function () {
        that.project = new Project({ id: that.model.get('projectID') });
        return that.project.fetch();
      });
 
      this.items = items;
      itemsPromise = items.fetch({
        condition: { collectionID: this.model.get('id') }
      });

    $.when(modelPromise, itemsPromise, projectPromise).then(that.render.bind(that));
  },
  render: function () {
    var that = this
      , template = require('../templates/collection.html')

    this.$el.html(template({ project: that.project, items: that.items }));
    this.stickit();
  }
});
