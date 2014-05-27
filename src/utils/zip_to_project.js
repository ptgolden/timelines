"use strict";

var $ = require('jquery')
  , JSZip = require('jszip')
  , uid = require('uid')
  , Project = require('../models/project')
  , Collection = require('../models/collection')
  , Item = require('../models/item')

function handleCollection(project, collectionFolder) {
  var name = collectionFolder.root.slice(0, -1)
    , description = collectionFolder.file(/description.txt/)[0].asText()
    , data = JSON.parse(collectionFolder.file(/items.json/)[0].asText())
    , collection = new Collection({ name: name, projectID: project.get('id') })
    , promise

  promise = collection.save().then(function () {
    return $.when.apply($, data.map(function (item) {
      item.collectionID = collection.get('id');
      item = new Item(item);
      return item.save();
    }));
  });

  return promise;
}

module.exports = function (zipFileArraybuffer, projectName) {
  var promise
    , dfd = $.Deferred()
    , zip = new JSZip(zipFileArraybuffer)
    , project = new Project({
      name: projectName || ('project' + uid()),
      description: zip.files['description.txt'].asText()
    })

  promise = project.save().then(function () {
    return $.when.apply($, zip.folder(/.*/).map(function (folder) {
      return handleCollection(project, zip.folder(folder.name));
    }));
  });

  promise.done(dfd.resolve.bind(null, project));

  return dfd.promise();
}
