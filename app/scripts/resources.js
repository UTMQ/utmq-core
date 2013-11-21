angular.module('problemServices', ['ngResource'])
  .factory('Problem', ['$resource',
        function($resource){
          return $resource('problems/:problemId', {}, {
            query: {method:'GET', params:{entryId:''}, isArray:true},
            get: {method:'GET', params:{setId:'@problemId'}, isArray:true},
            save: {method:'POST'},
            update: {method:'PUT', params:{setId:'@problemId'}},
            remove: {method:'DELETE'}
          });
        }]);
