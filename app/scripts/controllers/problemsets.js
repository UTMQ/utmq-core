'use strict';

angular.module('UTMQViewerApp')
  .controller('ProblemSetCtrl', function($scope, pouchService) {
    $scope.actions = [
      {action: 'Publish'},
      {action: 'Clone'},
      {action: 'Download'},
      {action: 'Delete'}
    ];
    
    // get problem sets from local pouchdb
    pouchService.query(function(data) {
      console.log('Data: ');
      console.log(data.rows)
      $scope.problemSets = data.rows;
      $scope.$apply();
    });
  });
