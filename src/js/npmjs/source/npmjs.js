var inherit = require('inherit'),
  SourceBase = require('common/source/base'),
  $ = require('jquery');

module.exports = inherit(SourceBase, {

  getSourceElementsSelector: function() {
    return 'pre:has(code)';
  },

  /**
   * Get source from npmjs
   * Usually each line is wrapped into a block "div.line", which makes parsing newlines a separated
   * case
   *
   * @param {string} id
   * @return {string}
   */
  getSourceTextById: function(id) {
    var element = this.getElementById(id),
      sourceText = '',
      lines = element.find('.line'),
      linesCount = lines.length;
    lines.each(function(index) {
      sourceText += $(this).text();
      if (index < linesCount - 1) {
        sourceText += '\n';
      }
    });
    return sourceText;
  }
});