var inherit = require('inherit'),
  Base = require('./base'),
  lazyLoad = require('lazyloadjs'),
  doc = require('global/document');

module.exports = inherit(Base, {

  initialize: function() {
    var self = this;
    self.getIframe().on('load', function iframeLoadHandler(event) {
      var lazyLoadInit = self.__static.sourceLazyLoad();
      lazyLoadInit(this);
      $(this).off('load', iframeLoadHandler);
    });
  }

}, {

  sourceLazyLoad: null,

  getLazyLoad: function() {
    if (!this.lazyLoad) {
      //Initialize the lazy load
      this.sourceLazyLoad = lazyLoad({
        container: doc.body,
        offset: 5000,
        src: 'data-src'
      });
    }
    return this.sourceLazyLoad;
  }

});