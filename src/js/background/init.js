var Messages = require('./messages/app'),
  ContextMenu = require('./context_menu/controller');

//Listen for messages from content script
Messages.listen();

ContextMenu.createContextMenu();