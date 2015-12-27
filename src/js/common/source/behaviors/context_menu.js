var inherit = require('inherit'),
  Base = require('./base'),
  message = require('../../message');

module.exports = inherit(Base, {

  initialize: function() {
    var self = this;
    this.source.on('mouseenter', function(event) {
      message.send('context_menu.CreateContextMenu', self.getSourceTextById(id)).then(function(result) {
      });
    });
    source.on('mouseleave', function(event) {
      event.stopPropagation();
      message.send('context_menu.RemoveContextMenu').then(function(result) {
      });
    });
  }

});