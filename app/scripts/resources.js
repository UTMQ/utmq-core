
angular.module('UTMQViewerApp', ['ngResource'])
  .factory('Set', ['$resource',
        function($resource){
          return $resource('sets/:setId', {}, {
            query: {method:'GET', params:{setId:'@setId'}, isArray:true},
            save: {method:'POST'},
            update: {method:'PUT', params:{setId:'@setId'}},
            remove: {method:'DELETE'}
          });
        }]);
