/**
 * Directives which forces the parent to always display the selected row
 * by updating the scroll
 *
 * @returns {Object}
 */

function ScrollInto() {
  return {
    restrict: 'A',
    scope: {
      scrollIntoActive: '@'
    },
    link: function ($scope, $element, $attrs, $ctrl) {
      var parent = $element.parent()[0],
        element = $element[0];
      $scope.$watch('scrollIntoActive', function(newValue) {
        if (newValue === 'active') {
          element.scrollIntoViewIfNeeded()(false);
        }
      });
    }
  };
}

module.exports = [
  'scrollInto',
  ScrollInto
];