var inherit = require('inherit');

module.exports = inherit({

  __constructor: function(iframeContainer, source, id, reader) {
    /**
     * The DOM element where the iframe container exists
     */
    this.iframeContainer = iframeContainer;
    /**
     * The unique source id
     */
    this.id = id;
    /**
     * The DOM element of the source code
     */
    this.source = source;
    /**
     * The function which reads raw source text from the element
     */
    this.reader = reader;
  },

  getIframe: function() {
    return this.iframeContainer.find('iframe');
  },

  initialize: function() {
    throw new Error('Initialize method should be implemented');
  }
});