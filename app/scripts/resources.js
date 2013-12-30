angular.module('problemServices', ['ngResource'])
  .factory('Problem', ['$resource',
    function ($resource) {
      return $resource('problems/:id',
        {id: '@id'},
        {
          query: {
            isArray: true,
            method: 'GET',
            params: {},
            transformResponse: function (data) {
              return angular.fromJson(data).body.rows
            }
          },
          get: {method: 'GET', params: {}},
          save: {method: 'POST'},
          update: {method: 'PUT', params: {}},
          delete: { method: 'DELETE', params: {} }
        });
    }]);


angular.module('courseServices', ['ngResource'])
  .factory('Course', ['$resource',
    function ($resource) {
      return $resource('courses/:id',
        {id: '@id'},
        {
          query: {
            isArray: true,
            method: 'GET',
            params: {},
            transformResponse: function (data) {
              return angular.fromJson(data).body.rows
            }
          },
          get: {method: 'GET', params: {id: '@id'}},
          save: {method: 'POST'},
          update: {method: 'PUT', params: {id: '@id'}},
          delete: { method: 'DELETE', params: {} }
        });
    }]);


angular.module('instructorServices', ['ngResource'])
  .factory('Instructor', ['$resource',
    function ($resource) {
      return $resource('instructors/:id',
        {id: '@id'},
        {
          query: {
            isArray: true,
            method: 'GET',
            params: {},
            transformResponse: function (data) {
              return angular.fromJson(data).body.rows
            }
          },
          get: {method: 'GET', params: {setId: '@id'}},
          save: {method: 'POST'},
          update: {method: 'PUT', params: {setId: '@id'}},
          remove: {method: 'DELETE', params: {} }
        });
    }]);


angular.module('submissionServices', ['ngResource'])
  .factory('Submission', ['$resource',
    function ($resource) {
      return $resource('submissions/:id',
        {id: '@id'},
        {
          query: {
            isArray: true,
            method: 'GET',
            params: {},
            transformResponse: function (data) {
              return angular.fromJson(data).body.rows
            }
          },
          get: {method: 'GET', params: {setId: '@id'}},
          save: {method: 'POST'},
          update: {method: 'PUT', params: {setId: '@id'}},
          delete: { method: 'DELETE', params: {} }
        });
    }]);
