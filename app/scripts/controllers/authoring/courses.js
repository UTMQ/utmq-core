'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringCoursesCtrl', function ($scope, Course) {

    var query = function () {
      Course.query().$promise
        .then(
        function (result) {
          $scope.courseList = result;
        },
        function (error) {
          // TODO: error
          alert(error);
        });
    };

    query();

    $scope.addCourse = function () {
      var nC = new Course();
      nC.name = $scope.newCourse;

      if (nC.name && nC.name.length > 0) {
        $scope.newCourse = '';
        nC.$save(function (resp) {
          console.log(resp);
          query();
        });
      } else {
        // TODO
        // notificationService.send('Fix naming');
      }
    };

    $scope.removeCourse = function (course) {
      console.log(course);
      course.$delete()
        .then(
          function (result) {
            console.log(result);
            query();
          },
          function (error) {
            console.log(error);
          }
        );
    };

  });
