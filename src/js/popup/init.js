var angular = require('angular');

var app = angular.module('HistoryApp', [
]);

//Services
app.factory.apply(app, require('common/app/services/message'));
app.factory.apply(app, require('common/app/services/storage'));

//Controllers
app.controller.apply(app, require('./controllers/history'));

//Filters

//Constants
app
  .constant('C', require('common/const'));
module.exports = app;