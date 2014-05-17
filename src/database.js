"use strict";

var migrations = [];

migrations.push({
  version: 1,
  migrate: function (transaction, next) {
    var itemStore
      , projectStore
      , collectionStore

    itemStore = transaction.db.createObjectStore('items');
    itemStore.createIndex('dateStartInt', 'dateStartInt', { unique: false });
    itemStore.createIndex('dateEndInt', 'dateEndInt', { unique: false });

    projectStore = transaction.db.createObjectStore('projects');
    projectStore.createIndex('name', 'name', { unique: true });

    collectionStore = transaction.db.createObjectStore('collections');
    collectionStore.createIndex('name', 'name', { unique: false });
    collectionStore.createIndex('itemID', 'itemID', { unique: false, multiEntry: true });

    next();
  }
})

module.exports = {
  id: 'timeline-db',
  description: 'Database for the timeline app. Contains projects, collections, and items.',
  migrations: migrations
}
