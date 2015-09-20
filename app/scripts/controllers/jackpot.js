'use strict';

angular.module('bowlingUiApp')

.controller('JackpotController', ['BowlingApiClient', '$rootScope', '$scope', 'Session', function (BowlingApiClient, $rootScope, $scope, Session) {
  var client = Session.getApiClient();
  var leagueId = $rootScope.leagueId;

  $rootScope.activeTab = 'jackpot';

  client.getLeague({
    leagueId: leagueId
  }).then(function(league) {
    $scope.bowlers = league.data.bowlers;
    $scope.bowler = $scope.bowlers[0];
  });

  $scope.purchaseTicket = function() {
    client.purchaseTicket({
      bowlerId: $scope.bowler.id,
      leagueId: leagueId
    }).then(function() {
      $scope.currentJackpot++;
    });
  };

  $scope.drawWinner = function() {
    client.drawWinner({
      leagueId: leagueId
    }).then(function(bowler) {
      $scope.selectedWinner = {
        message: bowler.data.name,
        success: true
      };
    }).catch(function(error) {
      $scope.selectedWinner = {
        message: error.data.message,
        success: false
      };
    });
  };

  $scope.pinsRolled;
  $scope.updateWinner = function() {
    client.updateRoll({
      leagueId: leagueId,
      pinsKnockedDown: $scope.pinsRolled
    }).then(function(payout) {
      console.log(payout)
      $scope.payouts.push(payout.data);
      client.getLeague({
        leagueId: leagueId
      }).then(function(league) {
        $scope.currentJackpot = league.data.jackpotBalance;
      });
    });
  };

  client.getLeague({
    leagueId: leagueId
  }).then(function(league) {
    $scope.currentJackpot = league.data.jackpotBalance;
  });

  client.getLeaguePayouts({
    leagueId: leagueId
  }).then(function(payouts) {
    $scope.payouts = payouts.data;
  });
}]);
