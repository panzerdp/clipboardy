/**
 * Controller for buttons in the iframe
 */

// @ngInject
function HistoryController(Storage, C) {
  var self = this;
  self.historyItems = [];

  Storage.get(C.KEY_CLIPBOARD_HISTORY, []).then(function(storageHistoryItems) {
    self.historyItems = storageHistoryItems;
  });
}

module.exports = [
  'HistoryController',
  HistoryController
];