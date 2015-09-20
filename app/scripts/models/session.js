'use strict';

angular.module('bowlingUiApp')

.factory('Session', ['BowlingApiClient', function(BowlingApiClient) {
  this.apiClient = this.apiClient || new BowlingApiClient('http://localhost:8190/api');
  this.leagueId = undefined;

  var Session = function() {};

  Session.getApiClient = function() {
    return this.apiClient;
  }.bind(this);

  return Session;
}]);