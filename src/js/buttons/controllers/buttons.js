/**
 * Controller for buttons in the iframe
 */

// @ngInject
function ButtonsCtrl(Message, C, SourceId, $q) {
  var self = this;

  self.onCopySourceClick = onCopySourceClick;

  function onCopySourceClick() {
    Message.send('Source.Get', {
      message: C.MESSAGE_GET_SOURCE_TEXT,
      id: SourceId.get()
    }).then(function(sourceText) {
      if (sourceText != null) {
        return Message.send('Clipboard.Write', sourceText);
      }
      return $q.reject('Source text is null');
    });
  }
}

module.exports = [
  'ButtonsCtrl',
  ButtonsCtrl
];