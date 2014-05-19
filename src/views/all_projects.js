"use strict";

var Backbone = require('../backbone')
  , Project = require('../models/project')

module.exports = Backbone.View.extend({
  events: {
    'click #add-project': 'addProject'
  },
  initialize: function () {
    var that = this;
    this.collection.fetch({
      success: that.render.bind(that)
    });
  },
  render: function () {
    var that = this
      , template = require('../templates/all_projects.html')

    this.$el.html(template({ collection: that.collection }));
  },
  addProject: function () {
    var $editing = this.$('#editing')
      , AddProjectView = require('./edit_project')
      , view = new AddProjectView({ model: new Project() })

    view.$el.appendTo($editing);
    this.listenToOnce(view.model, 'sync', function (model) {
      this.collection.add(model);
      this.render();
      view.remove();
    });
  }
});
