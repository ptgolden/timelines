"use strict";

var Backbone = require('../backbone')
  , $ = require('jquery')

module.exports = Backbone.View.extend({
  bindings: {
    ".item #item-title": 'title'
  },
  getEditEvents: function () {
    var editInline = require('./generic/edit_inline')
      , EditItemView = require('./edit_item')

    return {
      'click button[name="edit"]': editInline.editItem.bind(this, EditItemView),
      'click button[name="delete"]': editInline.deleteItem.bind(this, 'item', 'title', this.project.get('id'))
    }
  },
  initialize: function (options) {
    this.project = options.project;
    this.delegateEvents(this.getEditEvents());
    this.model.fetch({
      success: this.render.bind(this)
    });
  },
  render: function () {
    var that = this
      , template = require('../templates/item.html');

    this.$mainEl = $('<div class="item">').html(template({ item: this.model })).appendTo(that.$el);
    this.$editEl = $('<div>').appendTo(that.$el);

    this.stickit();
  }
});
