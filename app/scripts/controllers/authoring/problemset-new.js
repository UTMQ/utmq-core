'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringProblemSetNewCtrl', function($scope, pouchService) {
    
    $scope.saveProblem = function() {
      console.log('saveProblem');
      pouchService.save();
    }

  });
