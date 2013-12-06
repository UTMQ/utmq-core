'use strict';

angular
  .module('UTMQViewerApp',
    [
      'ngRoute',
      'ui.bootstrap',
      '$strap.directives',
      'problemServices',
      'courseServices',
      'instructorServices'
    ])
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
      .when('/instructors', {
        templateUrl: 'views/authoring/instructors.html',
        controller: 'AuthoringInstructorsCtrl'
      })

      .when('/courses', {
        templateUrl: 'views/authoring/courses.html',
        controller: 'AuthoringCoursesCtrl'
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
