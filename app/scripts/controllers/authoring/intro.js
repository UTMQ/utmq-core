'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringIntroCtrl', function($scope, persona) {
    $scope.login = function () {
      persona.login();
    };
  });
