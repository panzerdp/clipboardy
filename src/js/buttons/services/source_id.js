/**
 * Get the source id from iframe url
 */
// @ngInject
function SourceId($window) {
  var sourceId = null;
  var methods = {

    /**
     * Get source id from iframe url query string
     *
     * @returns {string} Source id for current iframe
     */
    get: function() {
      if (sourceId != null) {
        return sourceId;
      }
      return methods.getParameterByName('id');
    },

    getParameterByName: function(name) {
      var match = new RegExp('[?&]' + name + '=([^&]*)').exec($window.location.search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }
  };
  return methods;
}

module.exports = [
  'SourceId',
  SourceId
];