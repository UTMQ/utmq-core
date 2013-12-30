'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringProblemNewCtrl', ['$scope', 'Problem', 'Course', '$location', function ($scope, Problem, Course, $location) {

    Course.query().$promise
      .then(
      function (result) {
        $scope.problem = new Problem();
        $scope.courses = result;
        if ($scope.courses.length > 0) {
          $scope.problem.course = $scope.courses[0].id;
        }
      });


    $scope.saveProblem = function () {
      console.log($scope.problem.name);
      $scope.problem.$save(function (resp) {
        if (resp.result.ok) {
          $location.path("/edit/" + resp.result.id);
        } else {
          // TODO
          alert('Database Error Occurred');
        }
      });
    }
  }]);
