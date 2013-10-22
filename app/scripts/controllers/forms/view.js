'use strict';

var ViewCtrl =
  angular.module('UTMQViewerApp')
    .controller('ViewCtrl', function ($scope, FormService, $routeParams) {
    $scope.form = {};

    // read form with given id
    FormService.form($routeParams.id).then(function(form) {
        $scope.form = form;
    });
});