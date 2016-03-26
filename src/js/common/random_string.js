module.exports = function() {
  return String(Math.round(Math.random() * 100000000)) + '-'+ String(Math.round(Math.random() * 100000000));
};