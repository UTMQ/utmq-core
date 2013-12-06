'use strict';

angular.module('UTMQViewerApp')
  .controller('StudentProblemCtrl', function($scope, $routeParams, Problem, Submission, $location) {

    Problem.get({id: $routeParams.id}).$promise
      .then(
      function (result) {
        $scope.problem = result;

      },
      function (error) {
        // TODO: error
        console.log(error);
      });



    $scope.submitProblem = function (problem) {
      console.log($scope.problem.json);
      var p = angular.fromJson(angular.toJson($scope.problem));
      console.log(p);
      var s = new Submission();
      for(var prop in p) {
        s[prop] = p[prop];
      }

      delete s._id;
      delete s._rev;
      delete s.updated_at;
      console.log(s);
      s.$save(function(resp) {
        if (resp.result.ok) {
          $location.path( "/");
        } else {
          // TODO
          console.log('Database Error Occurred');
        }
      });
    }
  });
