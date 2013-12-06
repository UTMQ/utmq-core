'use strict';

angular.module('UTMQViewerApp')
  .controller('StudentCoursesCtrl', function($scope, Course) {
    $scope.login = function () {
      console.log('calling request');
      navigator.id.request();
    };

    Course.query().$promise
      .then(
      function (result) {
        $scope.courseList = result;
      },
      function (error) {
        // TODO: error
        alert(error);
      });
  });
