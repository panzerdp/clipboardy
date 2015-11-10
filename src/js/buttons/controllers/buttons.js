/**
 * Controller for buttons in the iframe
 */

// @ngInject
function ButtonsCtrl(Message, C, SourceId, $q, $window) {
  var self = this;

  self.onCopySourceClick = onCopySourceClick;
  self.onSelectSourceClick = onSelectSourceClick;

  function onCopySourceClick() {
    Message.send('Source.Call', {
      message: C.MESSAGE_GET_SOURCE_TEXT,
      id: SourceId.get()
    }).then(function(sourceText) {
      if (sourceText != null) {
        return Message.send('Clipboard.Write', sourceText);
      }
      return $q.reject('Source text is null');
    });
  }

  function onSelectSourceClick() {
    Message.send('Source.Call', {
      message: C.MESSAGE_SELECT_SOURCE_TEXT,
      id: SourceId.get()
    }).then(function(response) {});
  }

}

module.exports = [
  'ButtonsCtrl',
  ButtonsCtrl
];