"use strict";

var Backbone = require('../backbone')

module.exports = Backbone.View.extend({
  bindings: {
    '#project-name': 'name',
    '#project-description': 'description'
  },
  events: {
    'click button[name="save"]': 'save',
    'click button[name="cancel"]': 'remove'
  },
  initialize: function () {
    this.render();
  },
  render: function () {
    var that = this
      , template = require('../templates/edit_project.html')

    this.$el.html(template({ project: that.model }));
    this.stickit();
  },
  save: function () {
    this.model.save();
    this.remove();
  }
});
