angular.module('UTMQViewerApp')
  .controller('StudentProblemCtrl', function($scope, $routeParams, Problem, Submission, $location) {

    Problem.get({id: $routeParams.id, role: 'student'}).$promise
      .then(
      function (result) {
        $scope.problem = result;

        $scope.sub = new Submission({
          problem: result._id,
          answers: [],
          problem_name: result.name
        });

        $scope.problem.questions.forEach(function(q) {
          $scope.sub.answers.push({value: 0});
        });

      },
      function (error) {
        // TODO: error
        console.log(error);
      });

    $scope.submitAnswers = function () {
      $scope.sub.$save(function(resp) {
        if (resp.result.ok && resp.result.id) {
          $location.path("/submission/" + resp.result.id);
          //location.reload();
        } else {
          // TODO
          console.log('Database Error Occurred');
        }
      });
    }
  });
