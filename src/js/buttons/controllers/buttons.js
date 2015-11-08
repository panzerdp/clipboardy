/**
 * Controller for buttons in the iframe
 */

// @ngInject
function ButtonsCtrl(Message, C) {
  var self = this;

  self.onCopySourceClick = onCopySourceClick;

  function onCopySourceClick() {
    Message.sendToCurrentTab({
      message: C.MESSAGE_GET_SOURCE_TEXT
    });
  }
}

module.exports = [
  'ButtonsCtrl',
  ButtonsCtrl
];