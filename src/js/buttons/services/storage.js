/**
 * Angular service to get data from chrome local storage
 */

var storage = chrome.storage.local;

function Storage($q) {
  return {
    get: function (key, def) {
      if (typeof def == 'undefined') {
        def = null;
      }
      var deferred = $q.defer();
      storage.get(key, function (item) {
        if (typeof key == 'string' && item[key] == null) {
          deferred.resolve(def);
        } else if (typeof key == 'object' && item == null) {
          deferred.resolve(def);
        } else if (typeof key == 'string') {
          deferred.resolve(item[key]);
        } else {
          deferred.resolve(item);
        }
      });
      return deferred.promise;
    },
    set: function (key_or_object, value) {
      var items = {},
        deferred = $q.defer();
      if (typeof key_or_object == 'string') {
        items[key_or_object] = value;
      } else if (typeof key_or_object == 'object') {
        items = key_or_object;
      } else {
        return false;
      }
      storage.set(items, deferred.resolve);
      return deferred.promise;
    }
  }
}

module.exports = [
  'Storage',
  Storage
];