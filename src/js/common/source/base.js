var inherit = require('inherit'),
  $ = require('jquery'),
  uuid = require('uuid'),
  sprintf = require('sprintf-js').sprintf,
  C = require('common/const'),
  buttonsIframeTemplate = require('./templates/buttons_iframe.html'),
  doc = require('global/document'),
  win = require('global/window'),
  _ = require('lodash');

module.exports = inherit({

  __constructor: function() {
    this.insertButtons();
    this.listenForMessages();
    this.listenForDomMutations();
  },

  /**
   * Get source element by id
   * @param {string} id
   * @return {Object}
   */
  getElementById: function(id) {
    return $('[data-source-id="' + id + '"]');
  },

  /**
   * Insert all the button iframe into page
   */
  insertButtons: function() {
    var self = this;
    this.getSourceElements()
      .filter(':not([data-source-id])')
      .each(function() {
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
      iframeContent = $(sprintf(buttonsIframeTemplate, iframeUrl, id));
    iframeContent.insertBefore(element);
  },

  /**
   * Get the source code text from dom element
   *
   * @param {string} id
   * @returns {string}
   */
  getSourceTextById: function(id) {
    var element = this.getElementById(id);
    return element.length > 0 ? element.text() : null;
  },

  /**
   * Select text in DOM element by id
   * @param {string} id
   * @returns {boolean} On successfull selection
   */
  selectTextById: function(id) {
    var text = this.getElementById(id).get(0),
      range,
      selection;
    if (!text) {
      return false;
    }
    if (doc.body.createTextRange) {
      range = doc.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (win.getSelection) {
      selection = win.getSelection();
      range = doc.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    return true;
  },

  /**
   * Display the Collapse buttons depending on the source element height
   *
   * @param {string} id
   * @return {boolean}
   */
  isCollapsible: function(id) {
    var element = this.getElementById(id);
    return element.height() > C.MIN_HEIGHT_FOR_DISPLAYING_COLLAPSE;
  },

  /**
   * Collapse or expand the source text
   *
   * @param {string} id
   * @param {boolean} isCollapsed
   */
  toggleCollapse: function(id, isCollapsed) {
    var element = this.getElementById(id);
    element.toggleClass('clipboardy-collapsed', isCollapsed);
  },

  /**
   * Listen for extension messages
   */
  listenForMessages: function() {
    var self = this;
    chrome.runtime.onMessage.addListener(function (request, sender, callback) {
      switch (request.message) {
        case C.MESSAGE_GET_SOURCE_TEXT:
          var sourceText = self.getSourceTextById(request.id);
          if (sourceText != null) {
            callback(sourceText);
          }
          break;
        case C.MESSAGE_SELECT_SOURCE_TEXT:
          self.selectTextById(request.id);
          callback(true);
          break;
        case C.MESSAGE_DISPLAY_COLLAPSE:
          callback(self.isCollapsible(request.id));
          break;
        case C.MESSAGE_TOGGLE_SOURCE_COLLAPSE:
          self.toggleCollapse(request.id, request.isCollapsed);
          callback(true);
          break;
      }
      win.focus();
      return true;
    });
  },

  /**
   * Check for DOM modifications and initialize the buttons again if necessary
   */
  listenForDomMutations: function() {
    var self = this,
      observer = new MutationObserver(_.debounce(self.insertButtons.bind(self), 50));
    observer.observe(doc.body, {
      childList: true,
      subtree: true
    });
  }

});