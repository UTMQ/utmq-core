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
      .when('/submissions', {
        templateUrl: 'views/authoring/submissions.html',
        controller: 'AuthoringSubmissionsCtrl'
      })
      .when('/submission/:id', {
        templateUrl: 'views/authoring/submission.html',
        controller: 'AuthoringSubmissionCtrl'
      })
      .when('/submissions-by-course/:id', {
        templateUrl: 'views/authoring/submissions-by-course.html',
        controller: 'AuthoringSubmissionsByCourseCtrl'
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
