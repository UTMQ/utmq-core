'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringSubmissionsByCourseCtrl', function ($scope, Submission) {

    Submission.query().$promise
      .then(
      function (result) {
        $scope.items = result;
      },
      function (error) {
        // TODO: error
        console.log(error);
      });


  });
