var inherit = require('inherit'),
  SourceBase = require('common/source/base'),
  npmjsReader = require('../readers/npmjs'),
  doc = window.document,
  toArray = require('to-array');

module.exports = inherit(SourceBase, {

  __constructor: function() {
    this.__base();
    //Use a custom reader for npmjs.com
    this.reader = npmjsReader;
  },

  getSourceElements: function() {
    return toArray(doc.querySelectorAll('pre:not([data-source-id])')).filter(function(element) {
      return element.querySelector('code') != null;
    });
  }
});