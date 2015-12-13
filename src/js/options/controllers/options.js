/**
 * Controller for buttons in the iframe
 */

function OptionsCtrl(Message, C, Storage) {
  "ngInject"
  var self = this;
  self.buttonsAppearance = false;
  self.buttonsList = [C.VALUE_BUTTONS_LIST_COPY];
  self.C = C;

  self.onButtonsAppearanceChange = onButtonsAppearanceChange;
  self.onButtonsListChange = onButtonsListChange;

  // Loading settings data from storage
  Storage.get(C.SETTING_BUTTONS_APPEARANCE, C.VALUE_BUTTONS_APPEARANCE_ALWAYS).then(function(buttonsAppearance) {
    self.buttonsAppearance = buttonsAppearance;
  });

  Storage.get(C.SETTING_BUTTONS_LIST, [C.VALUE_BUTTONS_LIST_COPY]).then(function(buttonsList) {
    self.buttonsList = buttonsList;
  });


  function onButtonsAppearanceChange() {
    Storage.set(C.SETTING_BUTTONS_APPEARANCE, self.buttonsAppearance);
  }

  function onButtonsListChange() {
    Storage.set(C.SETTING_BUTTONS_LIST, self.buttonsList);
  }
}

module.exports = [
  'OptionsCtrl',
  OptionsCtrl
];