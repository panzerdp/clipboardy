var angular = require('angular');

var app = angular.module('ButtonsApp', [
]);

//Services
app.factory.apply(app, require('common/app/services/message'));
app.factory.apply(app, require('./services/source_id'));
app.factory.apply(app, require('common/app/services/storage'));

//Controllers
app.controller.apply(app, require('./controllers/buttons'));

//Constants
app
  .constant('C', require('common/const'))
  .constant('url', require('url'))
  .constant('_', require('lodash'));

module.exports = app;