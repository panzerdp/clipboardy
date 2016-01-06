var inherit = require('inherit'),
  BaseReader = require('./base_reader'),
  message = require('../../message');

module.exports = inherit(BaseReader, {

  initialize: function() {
    var self = this;
    self.getSource().on('mouseenter', function(event) {
      message.send('context_menu.EnableContextMenu', self.reader(self.getSource())).then(function(result) {
      });
    });
    self.getSource().on('mouseleave', function(event) {
      event.stopPropagation();
      message.send('context_menu.DisableContextMenu').then(function(result) {
      });
    });
  }

}, {
  instances: {}
});

