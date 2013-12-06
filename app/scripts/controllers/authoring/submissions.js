'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringSubmissionsCtrl', function($scope, Course) {

    var query = function () {
      Course.query().$promise
        .then(
        function (result) {
          $scope.items = result;
        },
        function (error) {
          // TODO: error
          console.log(error);
        });
    };

    query();

  });
