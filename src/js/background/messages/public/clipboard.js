var textarea,
  documentInstance = require('global/document');

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
  console.log(text);
  textarea.value = text;
  textarea.focus();
  textarea.select();
  documentInstance.execCommand('Copy');
  callback(true);
};