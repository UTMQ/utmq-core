'use strict';

angular.module('UTMQViewerApp', [])
  .config(function ($routeProvider) {

    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/problemsets', {
        templateUrl: 'views/problemsets.html',
        controller: 'ProblemSetCtrl'
      })
      .when('/newproblemset', {
        templateUrl: 'views/newproblemset.html',
        controller: 'NewProblemSetCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
