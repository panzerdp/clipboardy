var C = require('common/const');

/**
 * Send a message to tab and forward the response
 *
 * @param {Object} data
 * @param {Function} callback
 * @param {Object} sender
 * @returns {boolean}
 */
exports.Get = function (data, callback, sender) {
  if (!sender.tab) {
    callback(null);
  }
  chrome.tabs.sendMessage(sender.tab.id, data, function(tabResponse) {
    callback(tabResponse);
  });
  return true;
};