"use strict";

var _ = require('underscore')
  , Backbone = require('../backbone')
  , Project = require('../models/project')

module.exports = Backbone.View.extend({
  events: {
    'click #add-project': 'addProject',
    'click #import-sample': 'importSample',
    'change input[name="import"]': 'importProject'
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
  },
  importProject: function (e) {
    var zipToProject = require('../utils/zip_to_project')
      , zipFile = _.first(e.target.files)
      , reader = new FileReader()

    reader.onload = function (e) {
      var promise = zipToProject(e.target.result);
      promise.done(function (project) {
        Backbone.history.navigate(project.get('id'), { trigger: true });
      });
    }
    reader.readAsArrayBuffer(zipFile);
  },
  importSample: function () {
    var zipToProject = require('../utils/zip_to_project')
      , importname = 'CO Example Project'
      , project
      , exists
      , xhr
      
    exists = this.collection.any(function (project) {
      return project.get('name') === importname;
    })

    if (!exists) {
      xhr = new XMLHttpRequest();
      xhr.open('GET', 'dist/example_project.zip', true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function (e) {
        var arraybuffer = this.response
          , promise = zipToProject(arraybuffer, importname)

        promise.done(function (project) {
          Backbone.history.navigate(project.get('id'), { trigger: true });
        });
      }
      xhr.send();
    } else {
      project = this.collection.chain().filter(function (project) {
        return project.get('name') === importname
      }).first().value();
      Backbone.history.navigate(project.get('id'), { trigger: true });
    }
  }
});
