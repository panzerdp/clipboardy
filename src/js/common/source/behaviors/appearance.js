var inherit = require('inherit'),
  Base = require('./base');

module.exports = inherit(Base, {

  initialize: function() {
    var self = this;
    var iframeContainer = self.getIframeContainer();
    iframeContainer.classList.add('clipboardy-hidden');
    function onMouseOver() {
      iframeContainer.classList.remove('clipboardy-hidden');
    }
    function onMouseOut() {
      iframeContainer.classList.add('clipboardy-hidden');
    }
    self.getSource().addEventListener('mouseover', onMouseOver);
    self.getSource().addEventListener('mouseout', onMouseOut);
    iframeContainer.addEventListener('mouseover', onMouseOver);
    iframeContainer.addEventListener('mouseout', onMouseOut);
  }

}, {
  instances: {}
});