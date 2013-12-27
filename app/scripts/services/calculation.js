angular.module('UTMQViewerApp')
  .service('CalculationService', function CalculationService($http, $q) {

    /**
     * Calculates a result from an OpenMath object
     * @param xmlStruct, String, xml structure to calculate
     * @returns {promise|*}
     */
    var calculate = function (xmlStruct) {
      var deferred = $q.defer();

      var send = {
        // OpenMath structure
        om: xmlStruct,
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


    /**
     * Calculates a result from an OpenMath object
     * @param problem, Object, problem structure with all variables and OpenMath objects
     * @returns {promise|*}
     */
    var calculateForQuestion = function (problem, questionId) {
      var deferred = $q.defer();
      var send = {
        problem: problem,
        questionId: questionId
      };

      $http
        .post('/calculateForQuestion', send)
        .success(function (data, status) {
          deferred.resolve(data);
        }).error(function (data, status) {
          deferred.reject(data);
        });

      return deferred.promise;
    };


    return {
      calculate: calculate,
      calculateForQuestion: calculateForQuestion
    };
  });
