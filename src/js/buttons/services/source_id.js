/**
 * Get the source id from iframe url
 */
// @ngInject
function SourceId($window, url, _) {
  var sourceId = null;
  return {
    get: function() {
      if (sourceId != null) {
        return sourceId;
      }
      var parsedUrl = url.parse($window.location.href, true);
      sourceId = _.get(parsedUrl, 'query.id', null);
      return sourceId;
    }
  }
}

module.exports = [
  'SourceId',
  SourceId
];