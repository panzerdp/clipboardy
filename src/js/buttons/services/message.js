/**
 * Use chrome extension messages system
 */

// @ngInject
function Message($q) {
  return {
    /**
     * Send a message to Background script
     * @param method {String} The method name to be executed in background, for example: "Cookie.Get"
     * @param data {Object} The parameters sent to background
     * @returns {IPromise}
     */
    sendToBackground: function(method, data) {
      var deferred = $q.defer();
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
     * @returns {IPromise}
     */
    listenForMessages: function (callback) {
      chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
          callback(request, sendResponse);
          return true;
        }
      );
    },

    /**
     * Send a request to active tab.
     * Used from content script
     */
    sendToCurrentTab: function(data) {
      var deferred = $q.defer();
      chrome.tabs.getCurrent(function(tab) {
        if (!tab) {
          deferred.reject('No active tab was found');
          return;
        }
        chrome.tabs.sendMessage(tab.id, data, deferred.resolve);
      });
      return deferred.promise;
    }
  }
}

module.exports = [
  'Message',
  Message
];