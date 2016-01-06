var inherit = require('inherit'),
  BaseReader = require('./base_reader'),
  message = require('../../message');

module.exports = inherit(BaseReader, {

  initialize: function() {
    var self = this,
      source = self.getSource();
    source.on('mouseenter', function(event) {
      message.send('context_menu.EnableContextMenu', self.reader(source));
    });
    source.on('mouseleave', function(event) {
      event.stopPropagation();
      message.send('context_menu.DisableContextMenu');
    });
    if (source.is(':hover')) {
      //When refreshing the page, the cursor could be positioned near source
      message.send('context_menu.EnableContextMenu', self.reader(source));
    }
  }

}, {
  instances: {}
});