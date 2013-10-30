'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringIntroCtrl', function($scope, personaService) {
    $scope.login = function () {
      navigator.id.request();
    };
  });
