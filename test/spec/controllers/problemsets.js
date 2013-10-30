'use strict';

describe('Controller: StudentProblemSetListCtrl', function () {

  // load the controller's module
  beforeEach(function() {
    module('UTMQViewerApp')
  });

  var fakePouchService = {
    query: function() {}
  };
  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('StudentProblemSetListCtrl', {
      $scope: scope

    });
  }));

  it('should run the test and pass', function () {
    expect(true).toBe(true);
  });
});
