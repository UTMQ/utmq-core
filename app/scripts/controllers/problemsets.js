'use strict';

angular.module('UTMQViewerApp')
  .controller('ProblemSetCtrl', function($scope) {
    $scope.problemSets = [
      {name: 'Greedy'},
      {name: 'Divide and Conquer'},
      {name: 'Dynamic Programming'},
    ];
  });
