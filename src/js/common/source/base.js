var inherit = require('inherit'),
  $ = require('jquery'),
  uuid = require('uuid'),
  sprintf = require('sprintf-js').sprintf,
  C = require('common/const'),
  buttonsIframeTemplate = require('./templates/buttons_iframe.html'),
  doc = require('global/document'),
  win = require('global/window'),
  _ = require('lodash'),
  storage = require('common/storage'),
  lazyLoad = require('lazyloadjs');

module.exports = inherit({

  __constructor: function() {

    this.sourceLazyLoad = null;

    this.initializeLazyLoad();
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
    storage.get(C.SETTING_BUTTONS_LAYOUT, C.VALUE_BUTTONS_LAYOUT_RIGHT).then(function(buttonsLayout) {
      self.getSourceElements()
        .filter(':not([data-source-id])')
        .each(function() {
          var sourceElement = $(this),
            id = uuid.v1();
          self.insertIframe(sourceElement, id, buttonsLayout);
        });
    }).catch(function(error) {
      console.error(error);
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
   * @param {string} buttonsLayout The layout to display the buttons: C.VALUE_BUTTONS_LAYOUT_TOP
   *        or C.VALUE_BUTTONS_LAYOUT_RIGHT
   */
  insertIframe: function(element, id, buttonsLayout) {
    var isRightLayout = buttonsLayout == C.VALUE_BUTTONS_LAYOUT_RIGHT,
      self = this;
    element
      .attr('data-source-id', id);
    var iframeUrl = chrome.extension.getURL('buttons.html') + '?id=' + id,
      iframeLayoutClass = isRightLayout ? 'clipboardy-buttons-layout-right' : 'clipboardy-buttons-layout-top',
      iframeContent = $(sprintf(buttonsIframeTemplate, iframeLayoutClass, iframeUrl, id));
    iframeContent.find('iframe').on('load', function iframeLoadHandler(event) {
      self.sourceLazyLoad(this);
      $(this).off('load', iframeLoadHandler);
    });
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
   * Get the height of the source
   *
   * @param {string} id
   * @return {int}
   */
  getSourceHeight: function(id) {
    var element = this.getElementById(id);
    return element.height();
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
        case C.MESSAGE_GET_SOURCE_HEIGHT:
          callback(self.getSourceHeight(request.id));
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
  },

  /**
   * Initialize the lazy load module for iframe
   *
   */
  initializeLazyLoad: function() {
    this.sourceLazyLoad = lazyLoad({
      container: doc.body,
      offset: 600,
      src: 'data-src'
    });
  }

});