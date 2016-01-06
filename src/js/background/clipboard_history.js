var storage = require('common/storage'),
  C = require('common/const');

exports.addItem = function(text) {
  return storage.get(C.KEY_CLIPBOARD_HISTORY, []).then(function(clipboardHistoryItems) {
    var existingIndex = clipboardHistoryItems.indexOf(text);
    if (existingIndex !== -1) {
      //Remove the existing item. It will appear at the top of the list
      clipboardHistoryItems.splice(existingIndex, 1);
    }
    clipboardHistoryItems.unshift(text);
    if (clipboardHistoryItems.length > C.MAX_CLIPBOARD_HISTORY_ITEMS) {
      clipboardHistoryItems.length = C.MAX_CLIPBOARD_HISTORY_ITEMS;
    }
    return storage.set(C.KEY_CLIPBOARD_HISTORY, clipboardHistoryItems);
  })
};