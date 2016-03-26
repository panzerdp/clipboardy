var toArray = require('to-array');

/**
 * Custom reader function for npmjs.
 * Each line of code is is wrapped into "div.line" tag
 *
 * @param source
 * @returns {string}
 */
module.exports = function(source) {
  var lines = toArray(source.querySelectorAll('div.line')),
    linesCount = lines.length;
  if (linesCount > 0) {
    var text = '';
    lines.forEach(function(lineElement, index) {
      text += lineElement.innerText;
      if (index < linesCount - 1) {
        text += '\n';
      }
    });
    return text;
  } else {
    return source.innerText;
  }
};