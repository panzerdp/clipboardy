var C = require('common/const'),
  Clipboard = require('../messages/public/clipboard'),
  storage = require('common/storage');

exports.createContextMenu = function() {
  chrome.contextMenus.onClicked.addListener(function() {
    storage.get(C.KEY_LATEST_COPIED_TEXT, '').then(function(text) {
      Clipboard.Write(text, function() {});
    });
  });

  chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: C.CONTEXT_MENU_ID,
      title: 'Copy to clipboard',
      contexts: [
        'page'
      ],
      enabled: false,
      documentUrlPatterns: [
        "http://*.stackoverflow.com/*",
        "http://*.askubuntu.com/*",
        "http://*.stackexchange.com/*",
        "http://superuser.com/*",
        "http://serverfault.com/*",
        "https://*.github.com/*",
        "https://www.npmjs.com/*"
      ]
    });
  });

};