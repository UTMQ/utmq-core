'use strict';

angular.module('UTMQViewerApp', ['ngRoute', 'ui.bootstrap', '$strap.directives', 'problemServices'])
  .config(function ($routeProvider) {
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/authoring/intro.html',
        controller: 'AuthoringIntroCtrl'
      })
      .when('/manage', {
        templateUrl: 'views/authoring/problemset-list.html',
        controller: 'AuthoringProblemSetListCtrl'
      })
      .when('/new', {
        templateUrl: 'views/authoring/problemset-new.html',
        controller: 'AuthoringProblemSetNewCtrl'
      })
      .when('/edit/:id', {
        templateUrl: 'views/authoring/problemset-edit.html',
        controller: 'AuthoringProblemSetEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
