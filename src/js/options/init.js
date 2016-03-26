var angular = require('angular');

require('checklist-model');

var app = angular.module('OptionsApp', [
  'checklist-model'
]);

//Services
app.factory.apply(app, require('common/app/services/message'));
app.factory.apply(app, require('common/app/services/storage'));

//Controllers
app.controller.apply(app, require('./controllers/options'));

//Constants
app
  .constant('C', require('common/const'))
  .constant('loExtend', require('lodash/extend'));

module.exports = app;