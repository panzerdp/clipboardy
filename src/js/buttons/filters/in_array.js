/**
 * Angular filter to check if array contains the element
 *
 * @returns {Function}
 */

function inArray() {
  return function (array, value) {
    return Array.isArray(array) && array.indexOf(value) !== -1;
  };
}

module.exports = [
  'inArray',
  inArray
];