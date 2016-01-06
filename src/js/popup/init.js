var angular = require('angular');

var app = angular.module('HistoryApp', [
]);

//Services
app.factory.apply(app, require('common/app/services/message'));
app.factory.apply(app, require('common/app/services/storage'));

//Controllers
app.controller.apply(app, require('./controllers/history'));

//Filters
app.filter.apply(app, require('./filters/first_line'));

//Constants
app
  .constant('C', require('common/const'));
module.exports = app;