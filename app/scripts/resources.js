angular.module('problemServices', ['ngResource'])
  .factory('Problem', ['$resource',
        function($resource){
          return $resource('sets/:setId', {}, {
            query: {method:'GET', params:{entryId:''}, isArray:true},
            get: {method:'GET', params:{setId:'@setId'}, isArray:true},
            save: {method:'POST'},
            update: {method:'PUT', params:{setId:'@setId'}},
            remove: {method:'DELETE'}
          });
        }]);
