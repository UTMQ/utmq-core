'use strict';

angular.module('UTMQViewerApp', ['ui.bootstrap', '$strap.directives'])
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
      .when('/problemset-editor', {
        templateUrl: 'views/problemset-editor.html',
        controller: 'ProblemEditorCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
