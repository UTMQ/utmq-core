'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringProblemSetListCtrl', ['$scope', 'Problem', function($scope, Problem) {
    $scope.actions = [
      {action: 'Edit'},
      {action: 'Publish'},
      {action: 'Clone'},
      {action: 'Download'},
      {action: 'Delete'}
    ];

    Problem.query().$promise
      .then(
      function (result) {
        $scope.items = result;
      },
      function (error) {
        // TODO: error
        console.log(error);
      });
  }]);
