/**
 * Directive which forces the scroll offset reset when changing the content
 *
 * @returns {Object}
 */

function ScrollReset() {
  return {
    restrict: 'A',
    scope: {
      scrollResetValue: '@',
      scrollResetSelector: '@'
    },
    link: function ($scope, $element, $attrs, $ctrl) {
      $scope.$watch('scrollResetValue', function(newValue) {
        var elementToReset = $element.find($scope.scrollResetSelector);
        if (elementToReset.length > 0) {
          elementToReset[0].scrollTop = 0;
          elementToReset[0].scrollLeft = 0;
        }
      });
    }
  };
}

module.exports = [
  'scrollReset',
  ScrollReset
];