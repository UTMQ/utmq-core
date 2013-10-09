'use strict';

angular.module('UTMQViewerApp')
  .controller('NewProblemSetCtrl', function($scope, pouchService) {
    
    $scope.saveProblem = function() {
      console.log('saveProblem');
      pouchService.save();
    }

  });
