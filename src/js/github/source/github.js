var inherit = require('inherit'),
  SourceBase = require('common/source/base'),
  win = window,
  doc = window.document,
  toArray = require('to-array');

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
    toArray(doc.querySelectorAll('pre[data-source-id]')).forEach(function(element) {
      element.removeAttribute('data-source-id');
    });
    toArray(doc.querySelectorAll('.clipboardy-iframe-container')).forEach(function(element) {
      element.parentNode.removeChild(element);
    });
  },

  getSourceElements: function() {
    return toArray(doc.querySelectorAll('pre:not([data-source-id])'));
  }
});