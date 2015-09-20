'use strict';

angular.module('bowlingUiApp')

.controller('SignupController', ['BowlingApiClient', '$scope', function (BowlingApiClient, $scope) {
  var client = $scope.client || new BowlingApiClient('http://localhost:8190/api');

  $scope.loginObject = {};
  $scope.signupMessage = undefined;

  var getLoginOrSignupParams = function() {
    return {
      email: $scope.loginObject.email,
      password: $scope.loginObject.password,
      success: function(success) {
        $scope.signupMessage = {
          message: 'Success! User ID: ' + success.data.id,
          success: true
        };
      },
      error: function(error) {
        $scope.signupMessage = {
          message: error.data.message,
          success: false
        };
      }
    };
  };

  $scope.login = function() {
    client.loginUser(getLoginOrSignupParams());
  };

  $scope.signup = function() {
    var defaultLeagueName = 'Default League';
    var defaultBowlerNames = [
      'Bobby Bogus',
      'Danny Default',
      'Sally Sample',
      'Timmy Test'
    ];

    client.createUser(getLoginOrSignupParams())
    .then(function(asdf) {
      return client.createLeague({ name: defaultLeagueName }).then(function(league) {
        return league.data.id;
      });
    })
    .then(function(leagueId) {
      defaultBowlerNames.forEach(function(bowlerName) {
        client.createBowler({ name: bowlerName }).then(function(bowler) {
          return bowler.data.id;
        })
        .then(function(bowlerId) {
          client.joinLeague({
            bowlerId: bowlerId,
            leagueId: leagueId
          });
        });
      });
    });
  };

}]);
