var textarea,
  ClipboardHistory = require('../../clipboard_history'),
  doc = window.document;

/**
 * Write the text into clipboard
 *
 * @param {string} text
 * @param {Function} callback
 * @param {Object} sender
 */
exports.Write = function (text, callback, sender) {
  if (!textarea) {
    var textarea = doc.createElement('textarea');
    doc.body.appendChild(textarea);
  }
  textarea.value = text;
  textarea.focus();
  textarea.select();
  doc.execCommand('Copy');
  callback(true);
  //Save the current text to clipboard storage
  ClipboardHistory.addItem(text);
};