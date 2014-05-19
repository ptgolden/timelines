"use strict";

var Backbone = require('../backbone')
  , $ = require('jquery')

require('jquery-bootstrap');

module.exports = Backbone.View.extend({
  bindings: {
    '.project #project-name': 'name',
    '.project #project-description': 'description'
  },
  events: {
    'click button[name="edit"]': 'editProject',
    'click button[name="delete"]': 'deleteProject',
    'click button[name="save"]': 'saveProject',
  },
  initialize: function () {
    this.model.fetch({
      success: this.render.bind(this)
    });
  },
  render: function () {
    var that = this
      , template = require('../templates/project.html')

    this.$mainEl = $('<div class="project">').html(template({ project: this.model })).appendTo(that.$el);
    this.$editEl = $('<div>').appendTo(that.$el);
    this.stickit();
  },
  editProject: function () {
    var that = this
      , EditProjectView = require('./edit_project')
      , editView = new EditProjectView({ model: this.model })

    this.$mainEl.hide();
    editView.$el.appendTo(that.$editEl);
    this.listenToOnce(editView, 'removed', function (modelSaved) {
      if (modelSaved) {
        that.$mainEl.show();
      } else {
        // Save cancelled. Refresh page.
        that.remove();
        Backbone.history.loadUrl(Backbone.history.fragment);
      }
    });
  },
  deleteProject: function () {
    var that = this
      , template = require('../templates/delete_item_modal.html')
      , $modal = $(template({ message: 'Delete project <strong>' + that.model.get('name') + '</strong>?' }))

    $modal.prependTo('body').show().modal().on('hidden.bs.modal', function () {
      $modal.remove();
    });
    $modal.one('click', '[name="confirm-delete"]', function () {
      that.model.destroy({
        success: function () {
          that.remove.bind(that);
          $modal.modal('hide');
          Backbone.history.navigate('projects', { trigger: true });
        }
      });
    });

  }
});
