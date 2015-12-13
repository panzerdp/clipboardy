/**
 * Controller for buttons in the iframe
 */

// @ngInject
function ButtonsCtrl(Message, C, SourceId, $q, Storage) {
  var self = this;

  self.showCollapseButton = true;
  self.showSelectTextButton = true;
  self.isReady = false;
  self.isCollapsed = false;
  self.C = C;

  self.onCopySourceClick = onCopySourceClick;
  self.onSelectSourceClick = onSelectSourceClick;
  self.onToggleCollapseClick = onToggleCollapseClick;

  Message.send('Source.Call', {
    message: C.MESSAGE_GET_SOURCE_HEIGHT,
    id: SourceId.get()
  }).then(function(sourceHeight) {
    self.showCollapseButton = sourceHeight >= C.MIN_HEIGHT_FOR_DISPLAYING_COLLAPSE;
    self.showSelectTextButton = sourceHeight >= C.MIN_HEIGHT_FOR_DISPLAYING_SELECT_TEXT;
    return $q.all({
      buttonsAppearance:  Storage.get(C.SETTING_BUTTONS_APPEARANCE, C.VALUE_BUTTONS_APPEARANCE_ALWAYS),
      buttonsList: Storage.get(C.SETTING_BUTTONS_LIST, [C.VALUE_BUTTONS_LIST_COPY]),
      buttonsLayout: Storage.get(C.SETTING_BUTTONS_LAYOUT, C.VALUE_BUTTONS_LAYOUT_RIGHT)
    })
  }).then(function(buttonsSettings) {
    self.buttonsAppearance = buttonsSettings.buttonsAppearance;
    self.buttonsList = buttonsSettings.buttonsList;
    self.buttonsLayout = buttonsSettings.buttonsLayout;
    self.isReady = true;
  });

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

  function onToggleCollapseClick() {
    self.isCollapsed = !self.isCollapsed;
    Message.send('Source.Call', {
      message: C.MESSAGE_TOGGLE_SOURCE_COLLAPSE,
      id: SourceId.get(),
      isCollapsed: self.isCollapsed
    }).then(function(sourceText) {});
  }

}

module.exports = [
  'ButtonsCtrl',
  ButtonsCtrl
];