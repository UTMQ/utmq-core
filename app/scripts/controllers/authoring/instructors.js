'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringInstructorsCtrl', function($scope, Instructor) {

    var query = function () {
      Instructor.query().$promise
        .then(
        function (result) {
          $scope.items = result;
        },
        function (error) {
          // TODO: error
          alert(error);
        });
    };

    query();

    $scope.addItem = function () {
      var nC = new Instructor();
      nC.name = $scope.newInst;

      if (nC.name && nC.name.length > 0) {
        $scope.newInst = '';
        nC.$save(function (resp) {
          console.log(resp);
          query();
        });
      } else {
        // TODO
        // notificationService.send('Fix naming');
      }
    };

    $scope.removeItem = function (item) {
      console.log(item);
      item.$delete()
        .then(
        function (result) {
          console.log(result);
          query();
        },
        function (error) {
          console.log(error);
        }
      );
    };
  });
