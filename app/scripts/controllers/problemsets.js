'use strict';

angular.module('UTMQViewerApp')
  .controller('ProblemSetCtrl', function($scope) {
    $scope.problemSets = [
      {name: 'Greedy', date: 'Septermber 20 2013 at 2:51pm'},
      {name: 'Divide and Conquer', date: 'September 28 2013 at 3:12am'},
      {name: 'Dynamic Programming', date: 'October 1 2013 at 6:23pm'}
    ];
    $scope.actions = [
      {action: 'Publish'},
      {action: 'Clone'},
      {action: 'Download'},
      {action: 'Delete'}
    ];
  });
