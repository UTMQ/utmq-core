'use strict';

angular.module('UTMQViewerApp')
  .factory('persona', function ($rootScope, $http) {
    var resetUser = function () {
      localStorage.removeItem('personaEmail');
      $rootScope.email = false;
    };

    var login = function () {
      navigator.id.get(function (assertion) {
        if (!assertion) {
          console.log('No assertion provided');
          return;
        }

        var authUrl = '/auth';
        if ($rootScope.modeAuthoring) {
          authUrl = '/authInstructor';
        }

        $http({
          url: authUrl,
          method: 'POST',
          data: { assertion: assertion }
        }).success(function (data) {

            if (data.status === 'okay') {
              $http({
                url: '/login',
                method: 'GET'
              }).success(function (data) {

                  localStorage.setItem('personaEmail', data.email);
                  $rootScope.email = data.email;
                }).error(function (data) {

                  resetUser();
                  console.log('Login failed');
                });
            } else {

              resetUser();
              console.log('Login failed');
            }
          }).error(function (data) {

            resetUser();
            console.log('Login failed');
          });
      });
    };

    var logout = function () {
      $http({
        url: '/logout',
        method: 'POST'
      }).success(function (data) {

          if (data.status === 'okay') {
            $rootScope.email = null;
            resetUser();
          } else {

            console.log('Logout failed because ' + data.reason);
          }
        }).error(function (data) {

          console.log('error logging out: ', data);
        })
    };

    var protect = function () {
      if (!$rootScope.email) {
        window.location = '/';
      }
    };

    return {
      login: login,
      logout: logout,
      protect: protect
    };
  });