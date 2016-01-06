/**
 * Controller for buttons in the iframe
 */

// @ngInject
function HistoryController(Storage, C) {
  var self = this;
  self.historyItems = [];
  self.activeItemIndex = -1;

  Storage.get(C.KEY_CLIPBOARD_HISTORY, []).then(function(storageHistoryItems) {
    self.historyItems = storageHistoryItems;
    if (self.historyItems.length >= 0) {
      self.activeItemIndex = 0;
    }
  });
}

module.exports = [
  'HistoryController',
  HistoryController
];