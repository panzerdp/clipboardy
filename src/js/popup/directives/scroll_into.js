function ScrollInto() {
  return {
    restrict: 'A',
    scope: {
      scrollIntoActive: '@'
    },
    link: function ($scope, $element, $attrs, $ctrl) {
      console.log($scope.scrollIntoActive);
      if ($scope.scrollIntoActive !== 'active') {
        return;
      }
      $element[0].scrollIntoView();
    }
  };
}

module.exports = [
  'scrollInto',
  ScrollInto
];