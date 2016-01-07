var $ = require('jquery');

/**
 * Custom reader function for npmjs.
 * Each line of code is is wrapped into "div.line" tag
 *
 * @param source
 * @returns {string}
 */
module.exports = function(source) {
  var sourceText = '',
    lines = source.find('div.line'),
    linesCount = lines.length;
  lines.each(function(index) {
    sourceText += $(this).text();
    if (index < linesCount - 1) {
      sourceText += '\n';
    }
  });
  return sourceText;
};