var Q = require('q');

module.exports = {
  /**
   * Send a message to Background script
   * @param method {String} The method name to be executed in background, for example: "Cookie.Get"
   * @param data {Object} The parameters sent to background
   * @returns {Promise}
   */
  send: function(method, data) {
    var deferred = Q.defer();
    chrome.runtime.sendMessage({
      method: method,
      data: data
    }, function(response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  },

  /**
   * Listen for messages from other places of the extension (Popup or Background pages)
   * Used in content scripts of a tab
   */
  listen: function (callback) {
    chrome.runtime.onMessage.addListener(callback);
  }
};