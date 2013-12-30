angular.module('UTMQViewerApp')
  .controller('StudentSubmissionCtrl', function ($scope, $routeParams, Submission, Problem) {

    Submission.get({id: $routeParams.id}).$promise
      .then(
      function (sub) {
        $scope.sub = sub;

        return Problem.get({id: sub.problem }).$promise
      })
      .then(
      function (problem) {
        console.log($scope.sub);
        console.log(problem);

        $scope.problem = problem
      }
    );
  });
