angular.module('problemServices', ['ngResource'])
  .factory('Problem', ['$resource',
    function ($resource) {
      return $resource('problems/:problemId', {}, {
        query: {method: 'GET', params: {entryId: ''}},
        get: {method: 'GET', params: {setId: '@problemId'}, isArray: true},
        save: {method: 'POST'},
        update: {method: 'PUT', params: {setId: '@problemId'}},
        remove: {method: 'DELETE'}
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
            params: {entryId: ''},
            transformResponse: function (data) {return angular.fromJson(data).body.rows}
          },
          get: {method: 'GET', params: {setId: '@courseId'}, isArray: true},
          save: {method: 'POST'},
          update: {method: 'PUT', params: {setId: '@courseId'}},
          delete: { method: 'DELETE', params: { } }
        });
    }]);


angular.module('instructorServices', ['ngResource'])
  .factory('Instructor', ['$resource',
    function ($resource) {
      return $resource('instructors/:instructorId', {}, {
        query: {method: 'GET', params: {entryId: ''}},
        get: {method: 'GET', params: {setId: '@instructorId'}, isArray: true},
        save: {method: 'POST'},
        update: {method: 'PUT', params: {setId: '@instructorId'}},
        remove: {method: 'DELETE'}
      });
    }]);
