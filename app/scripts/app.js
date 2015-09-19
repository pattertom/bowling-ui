'use strict';

/**
 * @ngdoc overview
 * @name bowlingUiApp
 * @description
 * # bowlingUiApp
 *
 * Main module of the application.
 */
angular
  .module('bowlingUiApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/signup.html',
        controller: 'SignupController',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
