var inherit = require('inherit'),
  SourceBase = require('common/source/base');

module.exports = inherit(SourceBase, {
  getSourceElementsSelector: function() {
    return '.prettyprint';
  }
});