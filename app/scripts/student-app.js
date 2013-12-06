'use strict';

angular.module('UTMQViewerApp', [
    'ngRoute',
    'problemServices',
    'courseServices',
    'submissionServices'
  ])
  .config(function ($routeProvider) {


    $routeProvider
      .when('/', {
        templateUrl: 'views/student/intro.html',
        controller: 'StudentIntroCtrl'
      })
      .when('/problems', {
        templateUrl: 'views/student/problems.html',
        controller: 'StudentProblemsCtrl'
      })
      .when('/courses', {
        templateUrl: 'views/student/courses.html',
        controller: 'StudentCoursesCtrl'
      })
      .when('/problem/:id', {
        templateUrl: 'views/student/problem.html',
        controller: 'StudentProblemCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
