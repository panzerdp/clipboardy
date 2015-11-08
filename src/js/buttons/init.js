var angular = require('angular');

var app = angular.module('ButtonsApp', [

]);

app.controller.apply(this, require('./controllers/buttons'));

module.exports = app;