'use strict';

angular.module('UTMQViewerApp')
  .controller('AuthoringProblemSetEditCtrl', function ($scope, $routeParams, FormService, Problem, Course, EditorService, CalculationService) {

    // todo remove
    $scope.sel = {};
    $scope.calcResult = [];

    Problem.get({id: $routeParams.id}).$promise
      .then(
      function (result) {
        $scope.problem = result;

      },
      function (error) {
        // TODO: error
        console.log(error);
      });

    Course.query().$promise
      .then(
      function (result) {
        $scope.courses = result;
        console.log($scope.courses);
      },
      function (error) {
        // TODO: error
        console.log(error);
      });

    // preview form mode
    $scope.previewMode = false;


    // previewForm - for preview purposes, form will be copied into this
    // otherwise, actual form might get manipulated in preview mode
    $scope.previewForm = {};

    // add new field drop-down:
    $scope.addField = {};
    $scope.addField.types = FormService.fields;
    $scope.addField.new = $scope.addField.types[0].name;
    $scope.addField.lastAddedID = 0;

    // accordion settings
    $scope.accordion = {}
    $scope.accordion.oneAtATime = true;

    // create new field button click
    $scope.addNewField = function () {

      // incr field_id counter
      $scope.addField.lastAddedID++;

      var newField = {
        "field_id": $scope.addField.lastAddedID,
        "field_title": "Question " + ($scope.addField.lastAddedID),
        "field_type": $scope.addField.new,
        "field_value": "",
        "field_required": true,
        "field_hint": "HINT"
      };

      // put newField into fields array
      $scope.problem.questions.push(newField);
    }

    // deletes particular field on button click
    $scope.deleteField = function (field_id) {
      for (var i = 0; i < $scope.problem.questions.length; i++) {
        if ($scope.problem.questions[i].field_id == field_id) {
          $scope.problem.questions.splice(i, 1);
          break;
        }
      }
    }

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
    }

    // delete particular option
    $scope.deleteOption = function (field, option) {
      for (var i = 0; i < field.field_options.length; i++) {
        if (field.field_options[i].option_id == option.option_id) {
          field.field_options.splice(i, 1);
          break;
        }
      }
    }

    // preview form
    $scope.previewOn = function () {
      if ($scope.problem.questions == null || $scope.problem.questions.length == 0) {
        var title = 'Error';
        var msg = 'No fields added yet, please add fields to the form before preview.';
        var btns = [
          {result: 'ok', label: 'OK', cssClass: 'btn-primary'}
        ];

        //$dialog.messageBox(title, msg, btns).open();
      }
      else {
        $scope.previewMode = !$scope.previewMode;
        $scope.problem.submitted = false;
        angular.copy($scope.problem, $scope.previewForm);
      }
    }

    // hide preview form, go back to create mode
    $scope.previewOff = function () {
      $scope.previewMode = !$scope.previewMode;
      $scope.problem.submitted = false;
    }

    // decides whether field options block will be shown (true for dropdown and radio fields)
    $scope.showAddOptions = function (field) {
      return field.field_type === "radio"
    };

    // deletes all the fields
    $scope.reset = function () {
      $scope.problem.questions.splice(0, $scope.problem.questions.length);
      $scope.addField.lastAddedID = 0;
    };

    $scope.checkCalculation = function (editor) {
      CalculationService
        .calculate(editor)
        .then(
        function (res) {
          $scope['calcResult'][editor] = res.body;
        },
        function (res) {
          $scope['calcResult'][editor] = res.body;
        }
      );
    };


    $scope.saveSet = function (problem) {
      problem.course = $scope.selectedCourse;
      console.log(problem);
      problem.$update().then(
        function (result) {
          console.log(result);
          Problem.get({id: $routeParams.id}).$promise
            .then(
            function (result) {
              $scope.problem = result;

            },
            function (error) {
              // TODO: error
              console.log(error);
            });
        },
        function (error) {
          console.log(error);
        }
      );
    }

  });
