angular.module('UTMQViewerApp')
  .directive('fieldVariables', function (CalculationService) {
    return {
      restrict: 'E',
      templateUrl: './views/directive-templates/field/variables.html',
      controller: ['$scope', '$http', function ($scope, $parent) {

        /**
         * Check formula setup with an external CAS
         * @param editor
         * @param field, Object, question that is being checked.
         */
        $scope.checkCalculation = function (editor, field) {

          // set all the latest formulas from the editors
          $scope.problem.questions.forEach(function(q, idx) {
            q.field_formula = org.mathdox.formulaeditor.FormulaEditor.getEditorByTextArea("formula" + idx).getOpenMath();
          });

          /**
           * Send a request to find the result of a specified question.
           * Sending everything because the given question may relate to some other question in the set.
           */
          CalculationService
            .calculateForQuestion($scope.problem, field.field_id)
            .then(
            function (res) {
              $scope['calcResult'][editor] = res.body;
            },
            function (res) {
              $scope['calcResult'][editor] = res.body;
            }
          );
        };


        $scope.instructorRng = function () {
          var myrng = new Math.seedrandom('yay.');
          console.log('sup');
        };

        /**
         * Add a variable to this field
         * @param field
         */
        $scope.addVar = function (field) {
          var lastOptionID = field.field_variables.length;
          var newOption = {
            name: 'name' + lastOptionID,
            type: 'int'
          };

          field.field_variables.push(newOption);
        };

        /**
         * Remove a varibles from field at idx
         * @param field
         * @param idx
         */
        $scope.removeVar = function (field, idx) {
          field.field_variables.splice(idx, 1);
        };

        function parseFormulaWithVariables() {

        }

      }]
    };
  });
