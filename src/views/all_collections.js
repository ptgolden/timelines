"use strict";

var Backbone = require('../backbone')
  , ItemCollection = require('../models/collection')

module.exports = Backbone.View.extend({
  events: {
    'click #add-collection': 'addCollection'
  },
  initialize: function () {
    this.collection.fetch({
      conditions: { projectID: this.collection.project.get('id') },
      success: this.render.bind(this)
    });
  },
  render: function () {
    var template = require('../templates/all_collections.html');
    this.$el.html(template({ itemCollections: this.collection }));
  },
  addCollection: function () {
    var $editing = this.$('#editing')
      , AddItemCollectionView = require('./edit_collection')
      , model = new ItemCollection({ projectID: this.collection.project.get('id') })
      , view = new AddItemCollectionView({ model: model });

    view.$el.appendTo($editing);
    this.listenToOnce(view.model, 'sync', function (model) {
      this.collection.add(model);
      this.render();
      view.remove();
    });
  }
});
