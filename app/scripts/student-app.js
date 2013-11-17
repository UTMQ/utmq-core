'use strict';

angular.module('UTMQViewerApp', ['ngRoute'])
  .config(function ($routeProvider) {

    
    $routeProvider
      .when('/', {
        templateUrl: 'views/student/intro.html',
        controller: 'StudentIntroCtrl'
      })
      .when('/problem/:id', {
        templateUrl: 'views/student/problemset-view.html',
        controller: 'StudentViewProblemCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
