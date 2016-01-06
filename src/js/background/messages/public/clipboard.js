var textarea,
  documentInstance = require('global/document'),
  ClipboardHistory = require('../../clipboard_history');

/**
 * Write the text into clipboard
 *
 * @param {string} text
 * @param {Function} callback
 * @param {Object} sender
 */
exports.Write = function (text, callback, sender) {
  if (!textarea) {
    var textarea = document.createElement('textarea');
    documentInstance.body.appendChild(textarea);
  }
  textarea.value = text;
  textarea.focus();
  textarea.select();
  documentInstance.execCommand('Copy');
  callback(true);
  //Save the current text to clipboard storage
  ClipboardHistory.addItem(text);
};