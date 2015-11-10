var inherit = require('inherit'),
  $ = require('jquery'),
  uuid = require('uuid'),
  sprintf = require('sprintf-js').sprintf,
  C = require('common/const');

module.exports = inherit({

  __constructor: function() {
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
    element
      .attr('data-source-id', id);
    var iframeUrl = chrome.extension.getURL('buttons.html') + '?id=' + id,
      iframeContent = $(sprintf(require('./templates/buttons_iframe.html'), iframeUrl));
    iframeContent.insertBefore(element);
  },

  /**
   * Get the source code text from dom element
   *
   * @param {string} id
   * @returns {string}
   */
  getSourceTextById: function(id) {
    var element = $('[data-source-id="' + id + '"]');
    return element.length > 0 ? element.text() : null;
  },

  selectTextById: function(id) {
    console.log('Select text', id);
    var doc = document, text = $('[data-source-id="' + id + '"]').get(0), range, selection;
    if (!text) {
      return false;
    }
    if (doc.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    return true;
  },

  /**
   * Listen for extension messages
   */
  listenForMessage: function() {
    var self = this;
    chrome.runtime.onMessage.addListener(function (request, sender, callback) {
      switch (request.message) {
        case C.MESSAGE_GET_SOURCE_TEXT:
          var sourceText = self.getSourceTextById(request.id);
          if (sourceText != null) {
            callback(sourceText);
          }
          window.focus();
          break;
        case C.MESSAGE_SELECT_SOURCE_TEXT:
          self.selectTextById(request.id);
          callback(true);
          window.focus();
          break;
      }
      return true;
    });
  }

});