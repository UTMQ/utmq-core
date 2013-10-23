'use strict';

angular.module('UTMQViewerApp', [])
  .config(function ($routeProvider) {

    
    $routeProvider
      .when('/', {
        templateUrl: 'views/problemsets.html',
        controller: 'StudentListProblemsCtrl'
      })
      .when('/problem/:id', {
        templateUrl: 'views/student-problemset.html',
        controller: 'StudentViewProblemCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
