'use strict';

angular.module('UTMQViewerApp')
  .controller('NavCtrl', function ($scope) {
    if (location.pathname === "/authoring.html") {
      $scope.modeAuthoring = true;
    } else {
      $scope.modeStudent = true;
    }

  });

angular.module('UTMQViewerApp')
  .controller('FooterCtrl', function ($scope) {

  });