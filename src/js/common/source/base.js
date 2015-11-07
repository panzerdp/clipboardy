var inherit = require('inherit'),
  $ = require('jquery');

module.exports = inherit({

  __constructor: function() {

  },

  /**
   * The jQuery selector for source elements
   *
   * @return {string}
   */
  getSourceElementsSelector: function() {
    throw new Error('Method "getSourceElementsSelector" is not implemented');
  },

  /**
   * Get the list of jquery elements on the page where the buttons should be inserted
   *
   * @returns {Array}
   */
  getSourceElements: function() {
    return $(this.getSourceElements());
  },

  /**
   * Insert the buttons iframe into source element
   *
   * @param {Object} element
   */
  insertIframe: function(element) {
    var iframeContent = $(require('../templates/buttons_iframe.html')),
      iframe = iframeContent.find('iframe');

    element.append(iframeContent);
  },

  /**
   * Get the source code text from dom element
   *
   * @param element
   * @returns {string}
   */
  getSourceText: function(element) {
    return element.text();
  }

});