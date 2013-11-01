'use strict';

angular.module('UTMQViewerApp')
  .controller('StudentIntroCtrl', function($scope, personaService) {
    $scope.login = function () {
      console.log('calling request');
      navigator.id.request();
    };
  });
