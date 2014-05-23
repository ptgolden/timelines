"use strict";

var JSZip = require('jszip')
  , $ = require('jquery')
  , ItemCollection = require('../collections/item')

function addCollectionToZip(zip, collection) {
  var itemCollection = new ItemCollection([])
    , collectionPromise = collection.fetch()
    , itemsPromise = itemCollection.fetch({
      conditions: { collectionID: collection.get('id') }
    })

  return $.when(collectionPromise, itemsPromise).then(function () {
    var folder = zip.folder(collection.get('name'))
      , items = itemCollection.toJSON().map(function (item) {
        delete item.id;
        delete item.collectionID;
        return item;
      });

    folder.file('description.txt', collection.get('description'));
    folder.file('items.json', JSON.stringify(items, null, 2));
  });
}

function handleCollections(zip, collections) {
  var dfd = new $.Deferred()
    , promises = collections.map(addCollectionToZip.bind(null, zip));

  $.when.apply($, promises).done(dfd.resolve.bind(null, zip));

  return dfd.promise();
}

module.exports = function (project) {
  var zip = new JSZip()
    , itemCollections = project.itemCollections
    , zipPromise

  zip.file('description.txt', project.get('description'));

  zipPromise = itemCollections.fetch({
    conditions: { projectID: project.get('id') }
  }).then(handleCollections.bind(null, zip, itemCollections));

  return zipPromise;
}
