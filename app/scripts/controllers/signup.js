'use strict';

/**
 * @ngdoc function
 * @name bowlingUiApp.controller:SignupController
 * @description
 * # SignupController
 * Controller of the bowlingUiApp
 */
angular.module('bowlingUiApp')

.controller('SignupController', ['$rootScope', '$scope', function ($rootScope, $scope) {

  $scope.signup = function(username, password) {
    var client = new BowlingApiClient('http://localhost:8190/api');
    client.createUser({
      email: 'asdfzc',
      password: 'password',
      success: function(success) {
        debugger
        console.log(success.responseJSON.message, 'success')
      },
      error: function(error) {
        console.log(error.responseJSON.message, 'error')
        $rootScope.globalErrorMessage = error.responseJSON.message;
      }
    });
  };

}]);
