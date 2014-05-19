"use strict";

var Backbone = require('../backbone')

module.exports = Backbone.View.extend({
  bindings: {
    '#project-name': 'name',
    '#project-description': 'description'
  },
  events: {
    'click button[name="save"]': 'saveModel',
    'click button[name="cancel"]': function () { this.die(false) }
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
  saveModel: function () {
    var that = this;
    this.model.save().then(that.die.bind(this, true));
  },
  die: function (modelSaved) {
    this.trigger('removed', !!modelSaved);
    this.remove();
  }
});
