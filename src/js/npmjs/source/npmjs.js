var inherit = require('inherit'),
  SourceBase = require('common/source/base'),
  npmjsReader = require('../readers/npmjs'),
  doc = window.document;

module.exports = inherit(SourceBase, {

  __constructor: function() {
    this.__base();
    //Use a custom reader for npmjs.com
    this.reader = npmjsReader;
  },

  getSourceElements: function() {
    return toArray(doc.querySelectorAll('pre:has(code):not([data-source-id])'));
  }
});