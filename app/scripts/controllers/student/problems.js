'use strict';

angular.module('UTMQViewerApp')
  .controller('StudentProblemsCtrl', function($scope, Course) {

    Course.query().$promise
      .then(
      function (result) {
        $scope.items = result;
      },
      function (error) {
        // TODO: error
        alert(error);
      });
  });
