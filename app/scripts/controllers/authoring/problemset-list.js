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

    var pQuery = Problem.query(function() {
      if (pQuery.body && pQuery.body.rows.length > 0) {
        console.log(pQuery.body);
        $scope.problemSets = pQuery.body.rows;
      } else {
        $scope.noResults = true;
      }

    });
  }]);
