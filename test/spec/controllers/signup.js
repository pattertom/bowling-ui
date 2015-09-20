'use strict';

describe('Controller: SignupController', function () {

  // load the controller's module
  beforeEach(module('bowlingUiApp'));

  var SignupController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupController = $controller('SignupController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SignupController.awesomeThings.length).toBe(3);
  });
});
