'use strict';

angular.module('UTMQViewerApp')
  .controller('StudentProblemCtrl', function($scope, $routeParams, Problem, Submission, $location) {

    Problem.get({id: $routeParams.id}).$promise
      .then(
      function (result) {
        $scope.problem = result;

        $scope.submission = new Submission({
          problem: result._id,
          answers: [],
          problem_name: result.name
        });
      },
      function (error) {
        // TODO: error
        console.log(error);
      });

    $scope.submitAnswers = function () {
      $scope.submission.$save(function(resp) {
        if (resp.result.ok) {
          $location.path( "/");
        } else {
          // TODO
          console.log('Database Error Occurred');
        }
      });
    }
  });
