var inherit = require('inherit'),
  Base = require('./base');

module.exports = inherit(Base, {

  __constructor: function(id, reader) {
    this.__base(id);

    /**
     * The functions which parses the source text
     */
    this.reader = reader;
  }

}, {

  instances: {},

  createInstance: function(id, reader) {
    var instance = new this(id, reader);
    instance.initialize();
    this.instances[id] = instance;
    return instance;
  }

});