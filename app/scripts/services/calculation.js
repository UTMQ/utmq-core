angular.module('UTMQViewerApp')
  .service('CalculationService', function CalculationService($http, $q) {

    var calculate = function (editor, variables) {
      var deferred = $q.defer();

      var send = {
        // OpenMath structure
        om: $("#formula" + editor).val(),
        variables: []
      };

      $http
        .post('/calculate', send)
        .success(function (data, status) {
          deferred.resolve(data);
        }).error(function (data, status) {
          deferred.reject(data);
        });

      return deferred.promise;


    };


    return {
      calculate: calculate
    };
  });
