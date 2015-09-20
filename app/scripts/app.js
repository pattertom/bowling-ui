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
      controller: 'SignupController'
    })
    .when('/jackpot', {
      templateUrl: 'views/jackpot.html',
      controller: 'JackpotController',
      resolve: {
        factory: verifyLeagueId
      }
    })
    .otherwise({
      redirectTo: '/'
    });
});

var verifyLeagueId = function ($rootScope, $location) {
  if ($rootScope.leagueId) {
    return true;
  } else {
    $location.path('/');
  }
};