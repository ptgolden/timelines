"use strict";

var Backbone = require('./backbone')
  , $ = require('jquery')
  , root = location.protocol + '//' + location.host
  , Router

$(document).ready(function () {
  var router = new Router();
  Backbone.history.start();
}).on('click a', function (e) {
  if (e.target.href && e.target.href.indexOf(root) === 0) {
    e.preventDefault();
    Backbone.history.navigate(e.target.getAttribute('href'), { trigger: true });
  }
});

Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    ':project': 'project',
    ':project/item-:item': 'item',
    ':project/collection-:collection': 'collection'
  },

  _view: null,
  changeView: function (View, options) {
    if (this._view) this._view.remove();
    this._view = new View(options || {});
    this._view.$el.appendTo('#main');
  },

  _currentProject: null,
  _projectEl: $('#current-project'),
  setProject: function (projectID) {
    var that = this, Project, project;
    if (this._currentProject && this._currentProject.get('id') === projectID) {
      project = this._currentProject;
    } else if (projectID) {

      Project = require('./models/project');
      project = this._currentProject = new Project({ id: projectID });
      this._currentProject.fetch().then(function () {
        $('#current-project')
          .text(that._currentProject.get('name'))
          .attr('href', '#' + that._currentProject.get('id'));
      });
    } else {
      project = this._currentProject = null;
      $('#current-project').text('').attr('href', '');
    }
    return project;
  },
  index: function () {
    var AllProjectsView = require('./views/all_projects')
      , ProjectCollection = require('./collections/project')

    this.setProject();
    this.changeView(AllProjectsView, { collection: new ProjectCollection() });
  },
  project: function (projectID) {
    var ProjectView = require('./views/project')
      , project = this.setProject(projectID)

    this.changeView(ProjectView, { model: project });
  },
  collection: function (projectID, collectionID) {
    var CollectionView = require('./views/collection')
      , Collection = require('./models/collection')
      , project = this.setProject(projectID)

    this.changeView(CollectionView, { model: new Collection({ id: collectionID }) });
  },
  item: function (projectID, itemID) {
    var ItemView = require('./views/item')
      , Item = require('./models/item')
      , project = this.setProject(projectID)

    this.changeView(ItemView, { model: new Item({ id: itemID }) });
  }
});
