module.exports = function(source) {
  return source.length > 0 ? source.text() : null;
};