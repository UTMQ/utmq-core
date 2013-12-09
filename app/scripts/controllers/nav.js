'use strict';

angular.module('UTMQViewerApp')
  .controller('NavCtrl', function ($scope, $http, $rootScope, persona) {
    console.log('App');
    console.log($rootScope.email);
    $rootScope.isAuthenticated = false;
    if (localStorage.getItem('personaEmail')) {
      if (!$rootScope.email) {
        $http({
          url: '/login',
          method: 'GET'
        }).success(function (data) {

            $rootScope.isAuthenticated = true;
            $rootScope.email = data.email;
          }).error(function (data) {

            localStorage.removeItem('personaEmail')
            console.log('Login failed because ' + data);
          });
      }
    }

    $rootScope.login = function () {
      persona.login();
    };

    $rootScope.logout = function () {
      persona.logout();
    };


    if (location.pathname === "/authoring.html") {
      $scope.modeAuthoring = true;
    } else {
      $scope.modeStudent = true;
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