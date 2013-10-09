'use strict';

describe('Controller: ProblemSetCtrl', function () {

  // load the controller's module
  beforeEach(module('UTMQViewerApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('ProblemSetCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.actions.length).toBe(4);
  });
});
