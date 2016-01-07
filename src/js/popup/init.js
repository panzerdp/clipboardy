var angular = require('angular');

require('angular-highlightjs');

var app = angular.module('HistoryApp', [
  'hljs'
]);

//Services
app.factory.apply(app, require('common/app/services/message'));
app.factory.apply(app, require('common/app/services/storage'));

//Controllers
app.controller.apply(app, require('./controllers/history'));

//Filters
app.filter.apply(app, require('./filters/first_line'));

//Directives
app.directive.apply(app, require('./directives/scroll_into'));

//Constants
app
  .constant('C', require('common/const'));
module.exports = app;