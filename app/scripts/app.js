'use strict';

/**
 * @ngdoc overview
 * @name angularWeatherAppApp
 * @description
 * # angularWeatherAppApp
 *
 * Main module of the application.
 */
angular
  .module('angularWeatherAppApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
