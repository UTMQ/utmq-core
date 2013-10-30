'use strict';

angular.module('UTMQViewerApp')
  .controller('StudentIntroCtrl', function($scope, personaService) {
    $scope.login = function () {
      navigator.id.request();
    };
  });
