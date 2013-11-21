'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringProblemSetNewCtrl', ['$scope', 'Problem', '$location', function($scope, Problem, $location) {
    
    $scope.problem = {};
    $scope.saveProblem = function() {
      var newProblem = new Problem();
      console.log($scope.problem.name);
      newProblem.name = $scope.problem.name;
      newProblem.$save(function(resp) {
        if (resp.result.ok) {
          $location.path( "/edit/" +  resp.result.id );
        } else {
          // TODO
          alert('Database Error Occurred');
        }
      });
    }
  }]);
