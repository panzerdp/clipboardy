/**
 * Angular filter to trim strings
 *
 * @returns {Function}
 */

function firstLine() {
  return function (text) {
    if (typeof text === 'string') {
      text = text.trim();
      var indexOfNewLine = text.indexOf('\n');
      if (indexOfNewLine !== -1 ) {
        text = text.substr(0, indexOfNewLine);
        text += '...';
      }
      return text;
    }
    return text;
  };
}

module.exports = [
  'firstLine',
  firstLine
];