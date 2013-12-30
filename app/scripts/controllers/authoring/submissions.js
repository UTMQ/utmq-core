'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringSubmissionsCtrl', function ($scope, $routeParams, Problem, Submission) {

    var query = function () {
      Problem.get({ id: $routeParams.problemId }).$promise
        .then(
        function (problem) {
          $scope.problem = problem;

          return Submission.query({ problem: problem._id }).$promise;
        })
        .then(
        function (subs) {
          $scope.subs = subs;
        }
      );
    };

    query();

  });
