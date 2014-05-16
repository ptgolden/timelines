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
    'projects': 'allProjects',
    'projects/:project': 'project',
    'collections': 'allCollections',
    'collections/:collection': 'collection',
    'items': 'allItems',
    'items/:item': 'item'
  },

  _view: null,
  changeView: function (View, options) {
    if (this._view) this._view.remove();
    this._view = new View(options || {});
    this._view.$el.appendTo('#main');
  },

  index: function () {
    var IndexView = require('./views/index');
    this.changeView(IndexView);
  },
  allProjects: function () {
    var AllProjectsView = require('./views/all_projects');
    this.changeView(AllProjectsView);
  },
  project: function (project) {
    var ProjectView = require('./views/project');
    this.changeView(ProjectView);
  },
  allCollections: function() {
    var AllCollectionsView = require('./views/all_collections');
    this.changeView(AllCollectionsView);
  },
  collection: function(collection) {
    var CollectionView = require('./views/collection');
    this.changeView(CollectionView);
  },
  allItems: function () {
    var AllItemsView = require('./views/all_items');
    this.changeView(AllItemsView);
  },
  item: function (item) {
    var ItemView = require('./views/item');
    this.changeView(ItemView);
  }
});
