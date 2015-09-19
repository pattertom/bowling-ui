'use strict';

/**
 * @ngdoc function
 * @name bowlingUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bowlingUiApp
 */
angular.module('bowlingUiApp')

.controller('MainCtrl', ['$scope', function ($scope) {

  $scope.signup = function(username, password) {
    console.log(username, password);
  };

}]);
