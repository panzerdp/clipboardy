var $ = require('jquery');

/**
 * Custom reader function for npmjs.
 * Each line of code is is wrapped into "div.line" tag
 *
 * @param source
 * @returns {string}
 */
module.exports = function(source) {
  var lines = source.find('div.line'),
    linesCount = lines.length;
  if (linesCount > 0) {
    var text = '';
    lines.each(function(index) {
      text += $(this).text();
      if (index < linesCount - 1) {
        text += '\n';
      }
    });
    return text;
  } else {
    return source.text();
  }
};