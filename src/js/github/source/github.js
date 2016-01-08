var inherit = require('inherit'),
  SourceBase = require('common/source/base');

module.exports = inherit(SourceBase, {

  initialize: function () {
    this.__base();
    this.listenForWindowUnload();
  },

  listenForWindowUnload: function() {

  },

  getSourceElementsSelector: function() {
    return 'pre';
  }
});