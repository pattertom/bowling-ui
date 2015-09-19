'use strict';

angular.module('bowlingUiApp')

.factory('BowlingApiClient', ['$http', function($http) {
  var BowlingApiClient = function(endpoint) {
    this.endpoint = endpoint;
  };

  var email, password;

  var getAuthorizationToken = function() {
    // Since this is just an encoding, not an encryption, this is REALLY insecure
    // unless over https, which its not.
    return btoa(email + ':' + password);
  };

  var makeRequest = function(params, options) {
    params.headers = params.headers || {};
    params.headers['Content-Type'] = 'application/json';

    if (!params.excludeAuth) {
      $http.defaults.headers.common.Authorization = 'Basic ' + getAuthorizationToken();
    } else {
      delete params.excludeAuth;
    }

    var request = $http(params);
    request.then(function(response) {
      if (options.success) {
        options.success(response);
      }
    }).catch(function(response) {
      if (options.error) {
        options.error(response);
      }
    });

    return request;
  };

  BowlingApiClient.prototype.loginUser = function(options) {
    email = options.email;
    password = options.password;

    return makeRequest({ url: this.endpoint + '/user' }, options);
  };

  BowlingApiClient.prototype.createUser = function(options) {
    email = options.email;
    password = options.password;

    return makeRequest({
      method: 'POST',
      url: this.endpoint + '/user',
      data: { email: email, password: password },
      excludeAuth: true
    }, options);
  };

  BowlingApiClient.prototype.createLeague = function(options) {
    return makeRequest({
      method: 'POST',
      url: this.endpoint + '/league',
      data: { name: options.name }
    }, options);
  };

  BowlingApiClient.prototype.createBowler = function(options) {
    return makeRequest({
      method: 'POST',
      url: this.endpoint + '/bowler',
      data: { name: options.name }
    }, options);
  };

  BowlingApiClient.prototype.getBowlers = function(options) {
    return makeRequest({ url: this.endpoint + '/bowler' }, options);
  };

  BowlingApiClient.prototype.joinLeague = function(options) {
    return makeRequest({
      method: 'PUT',
      url: this.endpoint + '/league/' + options.leagueId + '/bowler',
      data: { id: options.bowlerId }
    }, options);
  };

  BowlingApiClient.prototype.purchaseTicket = function(options) {
    return makeRequest({
      method: 'POST',
      url: this.endpoint + '/lottery',
      data: { bowlerId: options.bowlerId, leagueId: options.leagueId }
    }, options);
  };

  BowlingApiClient.prototype.drawWinner = function(options) {
    return makeRequest({
      url: this.endpoint + '/league/' + options.leagueId + '/lottery'
    }, options);
  };

  BowlingApiClient.prototype.updateRoll = function(options) {
    return makeRequest({
      method: 'PUT',
      url: this.endpoint + '/league/' + options.leagueId + '/lottery',
      data: { pinsKnockedDown: options.pinsKnockedDown }
    }, options);
  };

  BowlingApiClient.prototype.getLeaguePayouts = function(options) {
    return makeRequest({
      url: this.endpoint + '/league/' + options.leagueId + '/lottery/payouts'
    }, options);
  };

  return BowlingApiClient;
}]);
