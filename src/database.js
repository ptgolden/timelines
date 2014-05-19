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
});

migrations.push({
  version: 2,
  migrate: function (transaction, next) {
    var itemStore = transaction.objectStore('items');
    itemStore.createIndex('added', 'added', { unique: false });
    itemStore.createIndex('itemType', 'itemType', { unique: false });
    itemStore.createIndex('metadataKeys', 'metadataKeys', { unique: false, multiEntry: true });

    var projectStore = transaction.objectStore('projects');
    projectStore.createIndex('added', 'added', { unique: false });

    var collectionStore = transaction.objectStore('collections');
    collectionStore.createIndex('added', 'added', { unique: false });

    next();
  }
});

migrations.push({
  version: 3,
  migrate: function (transaction, next) {
    var collectionStore = transaction.objectStore('collections');
    collectionStore.createIndex('projectID', 'projectID', { unique: false });
    collectionStore.deleteIndex('itemID');

    var itemStore = transaction.objectStore('items');
    itemStore.createIndex('collectionID', 'collectionID', { unique: false, multiEntry: true });
    itemStore.createIndex('title', 'title', { unique: false });

    next();
  }
});

module.exports = {
  id: 'timeline-db',
  description: 'Database for the timeline app. Contains projects, collections, and items.',
  migrations: migrations
}
