/**
 * Controller for buttons in the iframe
 */

function OptionsController(C, Storage, $q, $timeout, loExtend) {
  "ngInject"
  var self = this;
  self.stopTransitions = true;
  self.C = C;

  self.onButtonsAppearanceChange = onButtonsAppearanceChange;
  self.onButtonsListChange = onButtonsListChange;
  self.onButtonsLayoutChange = onButtonsLayoutChange;

  $q.all({
    buttonsAppearance:  Storage.get(C.SETTING_BUTTONS_APPEARANCE, C.VALUE_BUTTONS_APPEARANCE_ALWAYS),
    buttonsList: Storage.get(C.SETTING_BUTTONS_LIST, [C.VALUE_BUTTONS_LIST_COPY]),
    buttonsLayout: Storage.get(C.SETTING_BUTTONS_LAYOUT, C.VALUE_BUTTONS_LAYOUT_RIGHT)
  }).then(function(storageData) {
    loExtend(self, storageData);
    return $timeout(100);
  }).then(function() {
    self.stopTransitions = false;
  });

  function onButtonsAppearanceChange() {
    Storage.set(C.SETTING_BUTTONS_APPEARANCE, self.buttonsAppearance);
  }

  function onButtonsListChange() {
    Storage.set(C.SETTING_BUTTONS_LIST, self.buttonsList);
  }

  function onButtonsLayoutChange() {
    Storage.set(C.SETTING_BUTTONS_LAYOUT, self.buttonsLayout);
  }
}

module.exports = [
  'OptionsController',
  OptionsController
];