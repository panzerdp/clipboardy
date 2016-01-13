var C = require('common/const'),
  storage = require('common/storage');

/**
 * Create the context menu for copying the source to clipboard
 * @param {string} text
 * @param {Function} callback
 */
exports.EnableContextMenu = function(text, callback) {
  //remove the old menu if it exists
  chrome.contextMenus.update(C.CONTEXT_MENU_ID, {
    enabled: true
  });
  storage.set(C.KEY_LATEST_COPIED_TEXT, text).then(function() {
    callback(true);
  });
  return true;
};

/**
 * Disable the context menu when cursor is not over a source code
 * @returns {boolean}
 */
exports.DisableContextMenu = function(params, callback) {
  chrome.contextMenus.update(C.CONTEXT_MENU_ID, {
    enabled: false
  });
  callback(true);
  return true;
};