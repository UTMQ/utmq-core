'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringSubmissionCtrl', function($scope, $routeParams, Submission) {


    Submission.get({id: $routeParams.id}).$promise
      .then(
      function (result) {
        $scope.sub = result;

      },
      function (error) {
        // TODO: error
        console.log(error);
      });
  });
