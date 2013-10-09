'use strict';

angular.module('UTMQViewerApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'ProblemSetCtrl'
      })
      .when('/problemsets', {
        templateUrl: 'views/problemsets.html',
        controller: 'ProblemSetCtrl'
      })
      .when('/problemset-editor', {
        templateUrl: 'views/problemset-editor.html',
        controller: 'ProblemSetCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
