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
  message = require('common/message'),
  Q = require('q'),
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
    return Q.all([
      storage.get(C.SETTING_BUTTONS_LAYOUT, C.VALUE_BUTTONS_LAYOUT_RIGHT),
      storage.get(C.SETTING_BUTTONS_APPEARANCE, C.VALUE_BUTTONS_APPEARANCE_ALWAYS)
    ]).spread(function(buttonsLayout, buttonsAppearance) {
      self.getSourceElements()
        .each(function() {
          var sourceElement = $(this),
            id = uuid.v1();
          sourceElement.attr('data-source-id', id);
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
    return $(this.getSourceElementsSelector())
      .filter(':not([data-source-id])');
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
      iframeContent = $(sprintf(buttonsIframeTemplate, iframeLayoutClass, iframeUrl, id));
    if (typeof onBeforeInsertIframe === 'function') {
      onBeforeInsertIframe(iframeContent);
    }
    iframeContent.insertBefore(element);
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
          break;
        case C.MESSAGE_SELECT_SOURCE_TEXT:
          SelectSourceBehavior.getInstance(request.id).select();
          callback(true);
          break;
        case C.MESSAGE_GET_SOURCE_HEIGHT:
          callback(HeightSourceBehavior.getInstance(request.id).getHeight());
          break;
        case C.MESSAGE_TOGGLE_SOURCE_COLLAPSE:
          CollapseBehavior.getInstance(request.id).toggleCollapse(request.isCollapsed);
          callback(true);
          break;
      }
      win.focus(); //Small fix when the iframe captures the focus from the main frame
      return true;
    });
  },

  /**
   * Check for DOM modifications and initialize the buttons again if necessary
   */
  listenForDomMutations: function() {
    var self = this,
      observer = new MutationObserver(_.debounce(function() {
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