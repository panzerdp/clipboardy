var inherit = require('inherit'),
  Base = require('./base'),
  message = require('../../message');

module.exports = inherit(Base, {

  initialize: function() {
    var self = this;
    self.getSource().on('mouseenter', function(event) {
      message.send('context_menu.CreateContextMenu', self.reader(self.getSource())).then(function(result) {
      });
    });
    self.getSource().on('mouseleave', function(event) {
      event.stopPropagation();
      message.send('context_menu.RemoveContextMenu').then(function(result) {
      });
    });
  }

});