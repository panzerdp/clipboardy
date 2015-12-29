var inherit = require('inherit'),
  $ = require('jquery'),
  sprintf = require('sprintf-js').sprintf;

module.exports = inherit({

  __constructor: function(id, reader) {

    /**
     * The unique source id
     */
    this.id = id;

    /**
     * The function which reads raw source text from the element
     */
    this.reader = reader;

    /**
     * The DOM element of the source code
     */
    this.source = null;

    /**
     * The DOM element where the iframe container exists
     */
    this.iframeContainer = null;

    /**
     * The iframe where buttons are rendered
     */
    this.iframe = null;
  },

  getIframeContainer: function () {
    if (!this.iframeContainer) {
      this.iframeContainer = $(sprintf('[iframe-source-id="%s"]', this.id));
    }
    return this.iframeContainer;
  },

  getIframe: function() {
    if (!this.iframe) {
      this.iframe = this.getIframeContainer().find('iframe');
    }
    return this.iframe;
  },

  getSource: function() {
    if (!this.source) {
      this.source = $(sprintf('[data-source-id="%s"]', this.id));
    }
    return this.source;
  },

  initialize: function() {
    throw new Error('Initialize method should be implemented');
  }
}, {
  getInstance: function(id, reader) {
     console.log(this);
  }
});