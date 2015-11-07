var $ = require('jquery');

$(function() {
  $('.prettyprint').each(function() {
    var element = $(this);
    console.log(element.text());
  });
});
console.log('On stackoverflow');