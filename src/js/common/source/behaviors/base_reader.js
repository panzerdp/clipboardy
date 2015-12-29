var inherit = require('inherit'),
  Base = require('./base');

module.exports = inherit(Base, {

  initialize: function() {
    var self = this;
    console.log(self.getIframeContainer());
    console.log(self.getSource());
    self.getIframeContainer().addClass('clipboardy-hidden');
    self.getSource().add(self.getIframeContainer()).hover(function() {
      self.getIframeContainer().removeClass('clipboardy-hidden');
    }, function() {
      self.getIframeContainer().addClass('clipboardy-hidden');
    });
  }

});