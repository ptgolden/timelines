"use strict";

var Backbone = require('../backbone')
  , Item = require('../models/item')

module.exports = Backbone.View.extend({
  events: {
    'click #add-item': 'addItem'
  },
  initialize: function () {
    this.render();
  },
  render: function () {
    var template = require('../templates/all_items.html');
    this.$el.html(template({ items: this.collection }));
  },
  addItem: function () {
    var $editing = this.$('#editing')
      , AddItemView = require('./edit_item')
      , model = new Item({ collectionID: this.collection.itemCollection.get('id') })
      , view = new AddItemView({ model: model })

    view.$el.appendTo($editing);
    this.listenToOnce(view.model, 'sync', function (model) {
      this.collection.add(model);
      this.render();
      view.remove();
    });
  }
});
