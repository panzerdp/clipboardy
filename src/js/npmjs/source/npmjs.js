var inherit = require('inherit'),
  SourceBase = require('common/source/base'),
  npmjsReader = require('../readers/npmjs');

module.exports = inherit(SourceBase, {

  __constructor: function() {
    this.__base();
    //Use a custom reader for npmjs.com
    this.reader = npmjsReader;
  },

  getSourceElementsSelector: function() {
    return 'pre:has(code)';
  }
});