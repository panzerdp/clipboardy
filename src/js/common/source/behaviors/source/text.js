var inherit = require('inherit'),
  BaseReader = require('../base_reader');

module.exports = inherit(BaseReader, {

  getText: function() {
    return this.reader(this.getSource());
  }

}, {
  instances: {}
});