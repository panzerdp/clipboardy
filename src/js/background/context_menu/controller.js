var C = require('common/const'),
  ContextMenu = require('../messages/public/context_menu'),
  Clipboard = require('../messages/public/clipboard');

exports.createContextMenu = function() {
  chrome.contextMenus.onClicked.addListener(function() {
    Clipboard.Write(ContextMenu.getLatestText(), function() {});
  });

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


};