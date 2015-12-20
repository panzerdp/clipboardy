var C = require('common/const'),
  clipboard = require('./clipboard');

/**
 * Create the context menu for copying the source to clipboard
 * @param {string} text
 */
exports.CreateContextMenu = function(text) {
  //remove the old menu if it exists
  RemoveContextMenu();
  chrome.contextMenus.create({
    id: C.CONTEXT_MENU_ID,
    title: 'Copy to clipboard',
    contexts: [
      'page'
    ],
    onclick: function() {
      clipboard.Write(text, function() {});
    }
  });
  return true;
};

function RemoveContextMenu() {
  chrome.contextMenus.removeAll();
}

exports.RemoveContextMenu = RemoveContextMenu;