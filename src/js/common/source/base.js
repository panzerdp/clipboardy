var inherit = require('inherit'),
  $ = require('jquery'),
  uuid = require('uuid'),
  sprintf = require('sprintf-js').sprintf;

module.exports = inherit({

  __constructor: function() {

    /**
     * An array of the source elements
     *
     * @type {Array}
     */
    this.sourceElements = [];

    this.insertButtons();
    this.listenForMessage();
  },

  /**
   * Insert all the button iframe into page
   */
  insertButtons: function() {
    var self = this;
    this.getSourceElements().each(function() {
      var sourceElement = $(this),
        id = uuid.v1();
      self.sourceElements.push({
        id: id,
        sourceElement: sourceElement
      });
      self.insertIframe(sourceElement, id);
    });
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
    return $(this.getSourceElementsSelector());
  },

  /**
   * Insert the buttons iframe into source element
   *
   * @param {Object} element
   * @param {string} id
   */
  insertIframe: function(element, id) {
    var iframeUrl = chrome.extension.getURL('buttons.html') + '?id=' + id,
      iframeContent = $(sprintf(require('../templates/buttons_iframe.html'), iframeUrl));
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
  },

  /**
   * Listen for messages
   */
  listenForMessage: function() {

  }

});