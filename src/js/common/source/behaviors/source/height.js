var inherit = require('inherit'),
  Base = require('../base');

module.exports = inherit(Base, {

  __constructor: function(id) {
    this.__base(id);
  },

  getHeight: function() {
    return this.getSource().height();
  }
});