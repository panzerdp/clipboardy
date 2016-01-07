/**
 * Controller for buttons in the iframe
 */

// @ngInject
function HistoryController(Storage, C, $window, Message, Keycode) {
  var self = this;

  self.onKeydown = onKeydown;
  self.onRowClick = onRowClick;
  self.onRowDoubleClick = onRowDoubleClick;

  self.historyItems = [];
  self.activeItemIndex = -1;

  Storage.get(C.KEY_CLIPBOARD_HISTORY, []).then(function(storageHistoryItems) {
    self.historyItems = storageHistoryItems;
    if (self.historyItems.length > 0) {
      self.activeItemIndex = 0;
    }
  });

  function onKeydown(event) {
    if (!event instanceof KeyboardEvent) {
      return false;
    }
    event.preventDefault();
    switch (Keycode(event)) {
      case 'down':
        selectNextItem();
        break;
      case 'up':
        selectPreviousItem();
        break;
      case 'delete':
        deleteItem();
        break;
      case 'enter':
        copyItemToClipboard();
        $window.close();
        break;
      case 'page up':
      case 'home':
        selectFirstItem();
        break;
      case 'page down':
      case 'end':
        selectLastItem();
        break;
      case 'esc':
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
    var activeIndex = self.activeItemIndex;
    if (self.activeItemIndex === self.historyItems.length - 1) {
      activeIndex = self.historyItems.length - 2;
    }
    self.historyItems.splice(self.activeItemIndex, 1);
    self.activeItemIndex = activeIndex;
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

  function selectFirstItem() {
    if (self.historyItems.length === 0) {
      return;
    }
    self.activeItemIndex = 0;
  }

  function selectLastItem() {
    if (self.historyItems.length === 0) {
      return;
    }
    self.activeItemIndex = self.historyItems.length - 1;
  }
}

module.exports = [
  'HistoryController',
  HistoryController
];