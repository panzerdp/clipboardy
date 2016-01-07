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
      $scope.$watch('scrollIntoActive', function(newValue) {
        if (newValue === 'active') {
          $element[0].scrollIntoViewIfNeeded(false);
        }
      });
    }
  };
}

module.exports = [
  'scrollInto',
  ScrollInto
];