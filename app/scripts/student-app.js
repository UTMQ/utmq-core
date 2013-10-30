'use strict';

angular.module('UTMQViewerApp', [])
  .config(function ($routeProvider) {

    
    $routeProvider
      .when('/', {
        templateUrl: 'views/student/intro.html',
        controller: 'StudentProblemSetListCtrl'
      })
      .when('/problem/:id', {
        templateUrl: 'views/student/problemset-view.html',
        controller: 'StudentViewProblemCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
