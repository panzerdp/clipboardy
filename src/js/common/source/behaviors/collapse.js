var inherit = require('inherit'),
  Base = require('./base');

module.exports = inherit(Base, {

  /**
   * Collapse or expand the source text
   *
   * @param {boolean} isCollapsed
   */
  toggleCollapse: function(isCollapsed) {
    this.getSource().classList.toggle('clipboardy-collapsed', isCollapsed);
  }

}, {
  instances: {}
});