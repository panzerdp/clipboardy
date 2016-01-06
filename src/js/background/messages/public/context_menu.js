var C = require('common/const'),
  latestText = '';

/**
 * Create the context menu for copying the source to clipboard
 * @param {string} text
 */
exports.EnableContextMenu = function(text) {
  //remove the old menu if it exists
  chrome.contextMenus.update(C.CONTEXT_MENU_ID, {
    enabled: true
  });
  latestText = text;
  return true;
};

/**
 * Disable the context menu when cursor is not over a source code
 * @returns {boolean}
 */
exports.DisableContextMenu = function() {
  chrome.contextMenus.update(C.CONTEXT_MENU_ID, {
    enabled: false
  });
  return true;
};

/**
 * Get latest text from enabled stage
 * @returns {string}
 */
exports.getLatestText = function() {
  return latestText;
};