var inherit = require('inherit'),
  Base = require('./base'),
  lazyLoad = require('lazyloadjs'),
  doc = require('global/document');

module.exports = inherit(Base, {

  __constructor: function(id, iframeContainer) {
    this.__base(id);
    this.iframeContainer = iframeContainer;
  },

  initialize: function() {
    var self = this;
    self.getIframe().on('load', function iframeLoadHandler(event) {
      var lazyLoadInit = self.__self.getLazyLoad();
      lazyLoadInit(this);
      self.getIframe().off('load', iframeLoadHandler);
    });
  }

}, {

  instances: {},

  createInstance: function(id, iframeContainer) {
    var instance = new this(id, iframeContainer);
    instance.initialize();
    this.instances[id] = instance;
    return instance;
  },

  sourceLazyLoad: null,

  getLazyLoad: function() {
    if (!this.sourceLazyLoad) {
      //Initialize the lazy load
      this.sourceLazyLoad = lazyLoad({
        container: doc.body,
        offset: 1000,
        src: 'data-src'
      });
    }
    return this.sourceLazyLoad;
  }

});