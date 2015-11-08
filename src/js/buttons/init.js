var angular = require('angular');

var app = angular.module('ButtonsApp', [

]);

//Services
app.factory.apply(this, require('./services/message'));

//Controllers
app.controller.apply(this, require('./controllers/buttons'));

//Constants
app.constant('C', require('common/const'));

module.exports = app;