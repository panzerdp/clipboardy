var inherit = require('inherit'),
  SourceBase = require('common/source/base'),
  toArray = require('to-array'),
  doc = window.document;

module.exports = inherit(SourceBase, {
  getSourceElements: function() {
    return toArray(doc.querySelectorAll('.post-layout pre:not([data-source-id])'));
  }
});