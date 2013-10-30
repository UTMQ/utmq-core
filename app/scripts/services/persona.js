'use strict';

angular.module('UTMQViewerApp')
  .service('personaService', function personaService($http, $q) {

    navigator.id.watch({
      loggedInUser: null,
      onlogin: function (assertion) {
        var deferred = $q.defer();
        console.log('onlogin');

        $http.post("/auth", {assertion:assertion})
          .then(function (response) {
            if (response.data.status != "okay") {
              deferred.reject(response.data.reason);
            } else {
              deferred.resolve(response.data.email);
            }
          });
      },
      onlogout: function () {
        window.location = '/logout';
      }
    });

    return {

    }

  });