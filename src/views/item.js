"use strict";

var Backbone = require('../backbone')

module.exports = Backbone.View.extend({
  initialize: function () {
    this.model.fetch({
      success: this.render.bind(this)
    });
  },
  render: function () {
    var template = require('../templates/item.html');
    this.$el.html(template({ item: this.model }));
  }
});
