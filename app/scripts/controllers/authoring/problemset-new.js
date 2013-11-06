'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringProblemSetNewCtrl', function($scope, pouchService) {
    
    $scope.set = {}
    $scope.saveProblem = function() {
      console.log('saveProblem');
      var set={name:$scope.set.name};
      pouchService.save(set);
    }

  });
