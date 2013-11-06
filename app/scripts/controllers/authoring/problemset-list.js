'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringProblemSetListCtrl', ['$scope', 'Set', function($scope, Set) {
    $scope.actions = [
      {action: 'Edit'},
      {action: 'Publish'},
      {action: 'Clone'},
      {action: 'Download'},
      {action: 'Delete'}
    ];

    $scope.sets = Set.query();

    /*// get problem sets from local pouchdb*/
    //pouchService.query(function(data) {
      //console.log('Data: ');
      //console.log(data.rows)
      //$scope.problemSets = data.rows;
      //$scope.$apply();
    /*});*/
  }]);
