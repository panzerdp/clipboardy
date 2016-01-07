/**
 * Controller for buttons in the iframe
 */

// @ngInject
function HistoryController(Storage, C, $window, Message) {
  var self = this;

  self.onKeydown = onKeydown;
  self.onRowClick = onRowClick;
  self.onRowDoubleClick = onRowDoubleClick;

  self.historyItems = [];
  self.activeItemIndex = -1;

  Storage.get(C.KEY_CLIPBOARD_HISTORY, []).then(function(storageHistoryItems) {
    self.historyItems = storageHistoryItems;
    if (self.historyItems.length >= 0) {
      self.activeItemIndex = 0;
    }
  });

  function onKeydown(event) {
    if (!event instanceof KeyboardEvent) {
      return false;
    }
    event.preventDefault();
    switch (event.keyCode) {
      case C.CODE_KEY_ARROW_DOWN:
        selectNextItem();
        break;
      case C.CODE_KEY_ARROW_UP:
        selectPreviousItem();
        break;
      case C.CODE_KEY_DELETE:
        deleteItem();
        break;
      case C.CODE_KEY_ENTER:
        copyItemToClipboard();
        $window.close();
        break;
    }
  }

  function selectNextItem() {
    if (self.historyItems.length === 0) {
      self.activeItemIndex = -1;
    } else if (self.activeItemIndex === self.historyItems.length - 1) {
      self.activeItemIndex = 0;
    } else {
      self.activeItemIndex++;
    }
  }

  function selectPreviousItem() {
    if (self.historyItems.length === 0) {
      self.activeItemIndex = -1;
    } else if (self.activeItemIndex === 0) {
      self.activeItemIndex = self.historyItems.length - 1;
    } else {
      self.activeItemIndex--;
    }
  }

  function deleteItem() {
    if (self.activeItemIndex === -1) {
      return;
    }
    self.historyItems.splice(self.activeItemIndex, 1);
    Storage.set(C.KEY_CLIPBOARD_HISTORY, self.historyItems);
  }

  function copyItemToClipboard() {
    if (self.activeItemIndex === -1) {
      return;
    }
    Message.send('clipboard.Write', self.historyItems[self.activeItemIndex]);
  }

  function onRowClick(index) {
    self.activeItemIndex = index;
  }

  function onRowDoubleClick(index) {
    self.activeItemIndex = index;
    copyItemToClipboard();
    $window.close();
  }
}

module.exports = [
  'HistoryController',
  HistoryController
];