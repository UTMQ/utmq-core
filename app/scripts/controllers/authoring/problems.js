angular.module('UTMQViewerApp')
  .controller('AuthoringProblemsCtrl', ['$scope', 'Course', function ($scope, Course) {

    Course.query().$promise
      .then(
      function (result) {
        $scope.items = result;
      },
      function (error) {
        // TODO: error
        console.log(error);
      });

  }]);
