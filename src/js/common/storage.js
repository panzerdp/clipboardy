var Q = require('q'),
  chromeStorage = chrome.storage.local;

/**
 * Get data from storage
 *
 * @param {Object|string} key The string key or an object
 * @param {Object} def
 * @returns {Promise}
 */
exports.get = function (key, def) {
  if (typeof def === 'undefined') {
    def = null;
  }
  var deferred = Q.defer();
  chromeStorage.get(key, function (item) {
    if (typeof key === 'string' && item[key] == null) {
      deferred.resolve(def);
    } else if (typeof key === 'object' && item == null) {
      deferred.resolve(def);
    } else if (typeof key === 'string') {
      deferred.resolve(item[key]);
    } else {
      deferred.resolve(item);
    }
  });
  return deferred.promise;
};

/**
 * Store a value to storage
 *
 * @param {string|Object} key
 * @param {Object} value
 * @returns {Promise}
 */
exports.set = function (key, value) {
  var items = {},
    deferred = Q.defer();
  if (typeof key === 'string') {
    items[key] = value;
  } else if (typeof key === 'object') {
    items = key;
  }
  chromeStorage.set(items, deferred.resolve);
  return deferred.promise;
};