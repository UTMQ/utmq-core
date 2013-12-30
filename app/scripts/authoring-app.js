'use strict';

angular
  .module('UTMQViewerApp',
    [
      'ngRoute',
      'ui.bootstrap',
      '$strap.directives',
      'problemServices',
      'courseServices',
      'instructorServices',
      'submissionServices'
    ])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/authoring/intro.html',
        controller: 'AuthoringIntroCtrl'
      })
      .when('/problems', {
        templateUrl: 'views/authoring/problems.html',
        controller: 'AuthoringProblemsCtrl'
      })
      .when('/problems-by-course/:id', {
        templateUrl: 'views/authoring/problems-by-course.html',
        controller: 'AuthoringProblemsByCourseCtrl'
      })
      .when('/instructors', {
        templateUrl: 'views/authoring/instructors.html',
        controller: 'AuthoringInstructorsCtrl'
      })
      .when('/courses', {
        templateUrl: 'views/authoring/courses.html',
        controller: 'AuthoringCoursesCtrl'
      })
      .when('/submissions/:problemId', {
        templateUrl: 'views/authoring/submissions.html',
        controller: 'AuthoringSubmissionsCtrl'
      })
      .when('/submission/:id', {
        templateUrl: 'views/authoring/submission.html',
        controller: 'AuthoringSubmissionCtrl'
      })
      .when('/new', {
        templateUrl: 'views/authoring/problem-new.html',
        controller: 'AuthoringProblemNewCtrl'
      })
      .when('/edit/:id', {
        templateUrl: 'views/authoring/problem-edit.html',
        controller: 'AuthoringProblemSetEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
