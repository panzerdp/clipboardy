var inherit = require('inherit'),
  SourceBase = require('common/source/base'),
  win = window,
  $ = require('jquery');

module.exports = inherit(SourceBase, {

  initialize: function () {
    this.__base();
    this.listenForWindowUnload();
  },

  listenForWindowUnload: function() {
    var self = this;
    win.onpopstate = function onPopState() {
      self.removeButtons();
    };
  },

  removeButtons: function() {
    $(this.getSourceElementsSelector())
      .filter('[data-source-id]')
      .removeAttr('data-source-id');
    $('.clipboardy-iframe-container')
      .remove();
  },

  getSourceElementsSelector: function() {
    return 'pre';
  }
});