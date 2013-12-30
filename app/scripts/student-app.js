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
      .when('/problems-by-course/:id', {
        templateUrl: 'views/student/problems-by-course.html',
        controller: 'StudentProblemsByCourseCtrl'
      })
      .when('/problem/:id', {
        templateUrl: 'views/student/problem.html',
        controller: 'StudentProblemCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
