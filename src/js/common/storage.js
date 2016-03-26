var chromeStorage = chrome.storage.local;

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
  return new Promise(function(resolve, reject) {
    chromeStorage.get(key, function (item) {
      if (typeof key === 'string' && item[key] == null) {
        resolve(def);
      } else if (typeof key === 'object' && item == null) {
        resolve(def);
      } else if (typeof key === 'string') {
        resolve(item[key]);
      } else {
        resolve(item);
      }
    });
  });
};

/**
 * Store a value to storage
 *
 * @param {string|Object} key
 * @param {Object} value
 * @returns {Promise}
 */
exports.set = function (key, value) {
  var items = {};
  if (typeof key === 'string') {
    items[key] = value;
  } else if (typeof key === 'object') {
    items = key;
  }
  return new Promise(function(resolve) {
    chromeStorage.set(items, resolve);
  });
};