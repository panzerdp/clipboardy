/**
 * Controller for buttons in the iframe
 */

function OptionsCtrl(Message, C, Storage) {
  "ngInject"
  var self = this;
  self.buttonsAppearance = false;
  self.C = C;

  self.onButtonsAppearanceChange = onButtonsAppearanceChange;

  // Loading settings data from storage
  Storage.get(C.SETTING_BUTTONS_APPEARANCE, C.VALUE_BUTTONS_APPEARANCE_ALWAYS).then(function(buttonsAppearance) {
    self.buttonsAppearance = buttonsAppearance;
  });

  function onButtonsAppearanceChange() {
    Storage.set(C.SETTING_BUTTONS_APPEARANCE, self.buttonsAppearance);
  }
}

module.exports = [
  'OptionsCtrl',
  OptionsCtrl
];