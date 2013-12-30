'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringProblemsByCourseCtrl', ['$scope', '$routeParams', 'Course', 'Problem', function ($scope, $routeParams, Course, Problem) {

    $scope.actions = [
      {action: 'Edit'},
      {action: 'Publish'},
      {action: 'Clone'},
      {action: 'Download'},
      {action: 'Delete'}
    ];

    Course.get({id: $routeParams.id}).$promise
      .then(
      function (result) {
        $scope.details = result;
      })
      .then(function () {

      });


  }]);
