'use strict';

angular.module('UTMQViewerApp')
  .controller('NavCtrl', function ($scope, $http, $rootScope, persona) {

    if (localStorage.getItem('personaEmail') && !$rootScope.email) {
      $http({
        url: '/login',
        method: 'GET'
      }).success(function (data) {
          $rootScope.email = data.email;
          if (data.role === 'instructor') {
            $rootScope.roleInstructor = true;
          }
        }).error(function (data) {

          localStorage.removeItem('personaEmail')
          console.log('Login failed because ' + data);
        });
    }

    $rootScope.$on("$locationChangeStart", function (event, next, current) {
      $rootScope.error = null;
    });

    $rootScope.login = function () {
      persona.login();
    };

    $rootScope.logout = function () {
      persona.logout();
    };


    if (location.pathname === "/authoring.html") {
      $scope.modeAuthoring = true;
      $rootScope.modeAuthoring = true;
    } else {
      $scope.modeStudent = true;
      $rootScope.modeStudent = true;
    }

    $scope.login = function () {
      persona.login();
    };

    $scope.logout = function () {
      persona.logout();
    };

  });

angular.module('UTMQViewerApp')
  .controller('FooterCtrl', function ($scope) {

  });