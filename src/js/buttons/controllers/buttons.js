/**
 * Controller for buttons in the iframe
 */

// @ngInject
function ButtonsCtrl(Message, C) {
  var self = this;

  self.onCopySourceClick = onCopySourceClick;

  function onCopySourceClick() {
    Message.send('Source.Get', {
      message: C.MESSAGE_GET_SOURCE_TEXT
    }).then(function(sourceText) {
      console.log(sourceText);
    });
  }
}

module.exports = [
  'ButtonsCtrl',
  ButtonsCtrl
];