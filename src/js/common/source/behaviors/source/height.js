var inherit = require('inherit'),
  Base = require('./base');

module.exports = inherit(Base, {

  getHeight: function() {
    return this.getSource().height();
  }

});