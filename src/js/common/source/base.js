var inherit = require('inherit'),
  randomString = require('common/random_string'),
  sprintf = require('sprintf-js').sprintf,
  C = require('common/const'),
  buttonsIframeTemplate = require('./templates/buttons_iframe.html'),
  doc = window.document,
  win = window,
  debounce = require('lodash/debounce'),
  storage = require('common/storage'),
  message = require('common/message'),
  reader = require('./readers/text'),
  AppearanceBehavior = require('./behaviors/appearance'),
  LazyloadBehavior = require('./behaviors/lazyload'),
  ContextMenuBehavior = require('./behaviors/context_menu'),
  HeightSourceBehavior = require('./behaviors/source/height'),
  SelectSourceBehavior = require('./behaviors/source/select'),
  TextSourceBehavior = require('./behaviors/source/text'),
  CollapseBehavior = require('./behaviors/collapse');

module.exports = inherit({

  __constructor: function() {
    this.reader = reader;
  },

  /**
   * Insert button, attach event handlers
   */
  initialize: function() {
    this.insertButtons();
    this.listenForMessages();
    this.listenForDomMutations();
  },

  /**
   * Insert all the button iframe into page
   */
  insertButtons: function() {
    var self = this;
    return Promise.all([
      storage.get(C.SETTING_BUTTONS_LAYOUT, C.VALUE_BUTTONS_LAYOUT_RIGHT),
      storage.get(C.SETTING_BUTTONS_APPEARANCE, C.VALUE_BUTTONS_APPEARANCE_ALWAYS)
    ]).then(function(result) {
      var buttonsLayout = result[0],
        buttonsAppearance = result[1];
      self.getSourceElements()
        .forEach(function(sourceElement) {
          var id = randomString();
          sourceElement.setAttribute('data-source-id', id);
          ContextMenuBehavior.createInstance(id, self.reader);
          TextSourceBehavior.createInstance(id, self.reader);
          HeightSourceBehavior.createInstance(id);
          SelectSourceBehavior.createInstance(id);
          CollapseBehavior.createInstance(id);
          if (buttonsAppearance !== C.VALUE_BUTTONS_APPEARANCE_NOT_DISPLAY) {
            self.insertIframe(sourceElement, id, buttonsLayout, function(iframeContent) {
              //Lazy load requires initialization before the iframe is inserted into DOM
              LazyloadBehavior.createInstance(id, iframeContent);
            });
            if (buttonsAppearance === C.VALUE_BUTTONS_APPEARANCE_HOVER) {
              AppearanceBehavior.createInstance(id);
            }
          }
        });
      self.skipMutationObserver = false;
    }).catch(function(error) {
      console.error(error);
    });
  },

  /**
   * Get the list of elements on the page where the buttons should be inserted
   *
   * @returns {Array}
   */
  getSourceElements: function() {
    throw new Error('Not implemented');
  },

  /**
   * Insert the buttons iframe into source element
   *
   * @param {Object} element
   * @param {string} id
   * @param {string} buttonsLayout The layout to display the buttons: C.VALUE_BUTTONS_LAYOUT_TOP
   *        or C.VALUE_BUTTONS_LAYOUT_RIGHT
   * @param {function} onBeforeInsertIframe
   */
  insertIframe: function(element, id, buttonsLayout, onBeforeInsertIframe) {
    var isRightLayout = buttonsLayout === C.VALUE_BUTTONS_LAYOUT_RIGHT;
    var iframeUrl = chrome.extension.getURL('buttons.html') + '?id=' + id,
      iframeLayoutClass = isRightLayout ? 'clipboardy-buttons-layout-right' : 'clipboardy-buttons-layout-top',
      iframeContent = doc.createElement('div');
    iframeContent.innerHTML = sprintf(buttonsIframeTemplate, iframeLayoutClass, iframeUrl, id);
    if (typeof onBeforeInsertIframe === 'function') {
      onBeforeInsertIframe(iframeContent);
    }
    element.parentNode.insertBefore(iframeContent, element);
    return iframeContent;
  },

  /**
   * Listen for extension messages
   */
  listenForMessages: function() {
    var self = this;
    message.listen(function (request, sender, callback) {
      switch (request.message) {
        case C.MESSAGE_GET_SOURCE_TEXT:
          callback(TextSourceBehavior.getInstance(request.id).getText());
          self.tryToFocusWindow();
          break;
        case C.MESSAGE_SELECT_SOURCE_TEXT:
          SelectSourceBehavior.getInstance(request.id).select();
          callback(true);
          self.tryToFocusWindow();
          break;
        case C.MESSAGE_GET_SOURCE_HEIGHT:
          callback(HeightSourceBehavior.getInstance(request.id).getHeight());
          self.tryToFocusWindow();
          break;
        case C.MESSAGE_TOGGLE_SOURCE_COLLAPSE:
          CollapseBehavior.getInstance(request.id).toggleCollapse(request.isCollapsed);
          callback(true);
          self.tryToFocusWindow();
          break;
      }
      return true;
    });
  },

  tryToFocusWindow: function() {
    if (win.document.visibilityState === 'visible') {
      win.focus();
    }
  },

  /**
   * Check for DOM modifications and initialize the buttons again if necessary
   */
  listenForDomMutations: function() {
    var self = this,
      observer = new MutationObserver(debounce(function() {
        if (!self.skipMutationObserver) {
          self.skipMutationObserver = true;
          self.insertButtons();
        }
      }, 50));
    observer.observe(doc.body, {
      childList: true,
      subtree: true
    });
  }

});