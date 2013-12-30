angular.module('UTMQViewerApp')
  .controller('StudentProblemsByCourseCtrl', ['$scope', '$routeParams', 'Course', function ($scope, $routeParams, Course) {

    Course.get({id: $routeParams.id}).$promise
      .then(
      function (result) {
        $scope.details = result;
      });
  }]);
