function ButtonsCtrl() {
  var self = this;

  self.onCopySourceClick = onCopySourceClick;

  function onCopySourceClick() {
    console.log('Clicked');
  }
}

module.exports = [
  'ButtonsCtrl',
  ButtonsCtrl
];