'use strict';

describe('Controller: JackpotCtrl', function () {

  // load the controller's module
  beforeEach(module('bowlingUiApp'));

  var JackpotCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JackpotCtrl = $controller('JackpotCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JackpotCtrl.awesomeThings.length).toBe(3);
  });
});
