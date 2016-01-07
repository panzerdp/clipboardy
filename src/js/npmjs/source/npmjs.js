var inherit = require('inherit'),
  SourceBase = require('common/source/base'),
  npmjsReader = require('../readers/npmjs');

module.exports = inherit(SourceBase, {

  __constructor: function() {
    //Use a custom reader for npmjs.com
    this.reader = npmjsReader;
    this.insertButtons();
    this.listenForMessages();
    this.listenForDomMutations();
  },


  getSourceElementsSelector: function() {
    return 'pre:has(code)';
  }
});