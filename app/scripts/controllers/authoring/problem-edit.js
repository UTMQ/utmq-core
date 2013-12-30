'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringProblemSetEditCtrl', function (
    $scope,
    $routeParams,
    FormService,
    Problem,
    Course,
    EditorService,
    persona) {

    persona.protect();

    $scope.init = function () {
      EditorService.init();
    };

    // todo remove
    $scope.sel = {};
    $scope.calcResult = [];

    Problem.get({id: $routeParams.id}).$promise
      .then(
      function (result) {
        $scope.problem = result;

        $scope.addField.lastAddedID = result.questions.length;
        if(!$scope.problem.status) {
          $scope.problem.status = 'unpublished';
        }

      },
      function (error) {
        // TODO: error
        console.log(error);
      })
      .then(function() {
        Course.query().$promise
          .then(
          function (result) {
            $scope.courses = result;
            if(!$scope.problem.course) {
              $scope.problem.course = $scope.courses[0].key.name;
            }
          },
          function (error) {
            // TODO: error
            console.log(error);
          });

      });

    // add new field drop-down:
    $scope.addField = {};
    $scope.addField.types = FormService.fields;
    $scope.addField.new = $scope.addField.types[0].name;

    // accordion settings
    $scope.accordion = {};
    $scope.accordion.oneAtATime = true;


    // create new field button click
    $scope.addNewField = function () {

      // incr field_id counter
      $scope.addField.lastAddedID++;

      var newField = {
        field_id: $scope.addField.lastAddedID,
        field_title: "Question " + $scope.addField.lastAddedID,
        field_type: $scope.addField.new,
        field_value: "",
        field_required: true,
        field_hint: 'HINT',
        field_variables: []
      };

      // add a result variable
      var resultVar = {
        name: 'result',
        type: 'result'
      };

      newField.field_variables.push(resultVar);

      // put newField into fields array
      $scope.problem.questions.push(newField);

      setInterval(function() {
        if (org.mathdox.formulaeditor.FormulaEditor) {
          org.mathdox.formulaeditor.FormulaEditor.updateByTextAreas()
        }
      }, 1000);
    };

    // deletes particular field on button click
    $scope.deleteField = function (field_id) {
      for (var i = 0; i < $scope.problem.questions.length; i++) {
        if ($scope.problem.questions[i].field_id == field_id) {
          $scope.problem.questions.splice(i, 1);
          $scope.addField.lastAddedID--;
          break;
        }
      }
    };

    // add new option to the field
    $scope.addOption = function (field) {
      if (!field.field_options)
        field.field_options = [];

      var lastOptionID = 0;

      if (field.field_options[field.field_options.length - 1])
        lastOptionID = field.field_options[field.field_options.length - 1].option_id;

      // new option's id
      var option_id = lastOptionID + 1;

      var newOption = {
        "option_id": option_id,
        "option_title": "Option " + option_id,
        "option_value": option_id
      };

      // put new option into field_options array
      field.field_options.push(newOption);
    };

    // delete particular option
    $scope.deleteOption = function (field, option) {
      for (var i = 0; i < field.field_options.length; i++) {
        if (field.field_options[i].option_id == option.option_id) {
          field.field_options.splice(i, 1);
          break;
        }
      }
    };

    // decides whether field options block will be shown (true for dropdown and radio fields)
    $scope.showAddOptions = function (field) {
      return field.field_type === "radio"
    };

    // deletes all the fields
    $scope.reset = function () {
      location.reload();
    };



    $scope.saveSet = function (problem) {

      problem.questions.forEach(function(q, idx) {
        q.field_formula = org.mathdox.formulaeditor.FormulaEditor.getEditorByTextArea("formula" + idx).getOpenMath();
      });

      problem.$update().then(
        function (result) {
          location.reload();
          /*
          Problem.get({id: $routeParams.id}).$promise
            .then(
            function (result) {
              $scope.problem = result;
            },
            function (error) {
              // TODO: error
              console.log(error);
            });
            */
        },
        function (error) {
          console.log(error);
        }
      );
    }

  });
