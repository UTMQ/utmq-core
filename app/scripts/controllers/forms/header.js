'use strict';

angular.module('UTMQViewerApp')
  .controller('HeaderCtrl', function ($scope, $location) {
        $scope.$location = $location;
});
