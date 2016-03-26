module.exports = {
  /**
   * Send a message to Background script
   * @param method {String} The method name to be executed in background, for example: "Cookie.Get"
   * @param data {Object} The parameters sent to background
   * @returns {Promise}
   */
  send: function(method, data) {
    return new Promise(function(resolve) {
      chrome.runtime.sendMessage({
        method: method,
        data: data
      }, function(response) {
        resolve(response);
      });
    });
  },

  /**
   * Listen for messages from other places of the extension (Popup or Background pages)
   * Used in content scripts of a tab
   */
  listen: function (callback) {
    chrome.runtime.onMessage.addListener(callback);
  }
};