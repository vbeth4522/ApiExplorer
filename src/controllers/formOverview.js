'use strict';
var pluck = require('lodash/collection/pluck');
var each = require('lodash/collection/each');
var first = require('lodash/array/first');
var difference = require('lodash/array/difference');
var map = require('lodash/collection/map');

module.exports = function($scope, $http, $stateParams, FieldSvc, FormSvc, LocaleSvc) {
  var flow = $stateParams.flow
  var form = $stateParams.form
  $scope.form = form
  $scope.formFields = []
  $scope.allFields = []
  $scope.formFieldDefs = []
  $scope.fieldToAdd = undefined;
  $scope.locales = ['en-US']
  $scope.selectedLocale = first($scope.locales)

  function loadFields(fields) {
    each(fields, function(field) {
      FieldSvc
        .get(flow, field)
        .then(function(resp) {
          // Need to make sure these get ordered correctly
          $scope.formFieldDefs.push(resp.data)
        });
    });
  }

  FormSvc
    .get(flow, form)
    .then(function(resp) {
      // $scope.formFields = resp.data.fields;
      $scope.formFields = pluck(resp.data.fields, 'name')
      loadFields($scope.formFields)
    });
  LocaleSvc
    .getAll(flow)
    .then(function(resp) {
      $scope.locales = pluck(resp.data, 'name')
    });
  FieldSvc
    .getAll(flow)
    .then(function(resp) {
      $scope.allFields = pluck(resp.data, 'name')
    });

  $scope.addableFields = function() {
    return difference($scope.allFields, $scope.formFields);
  }

  function getFormFields() {
    return {
      'fields': map($scope.formFields, function(field) {
        return { 'name': field }
      })
    };
  }

  function idleSaveButton() {
    $scope.saveButtonText = "Save Form"
    $scope.saveButtonDisabled = false;
    $scope.saveButtonClasses = [
      'btn',
      'btn-primary',
      'btn-lg',
      'btn-block'
    ]
  }

  function workingSaveButton() {
    $scope.saveButtonText = "Saving..."
    $scope.saveButtonDisabled = true;
    $scope.saveButtonClasses = [
      'btn',
      'btn-primary',
      'btn-lg',
      'btn-block'
    ]
  }

  function successSaveButton() {
    $scope.saveButtonText = "Success!"
    $scope.saveButtonDisabled = false;
    $scope.saveButtonClasses = [
      'btn',
      'btn-success',
      'btn-lg',
      'btn-block'
    ]
    $timeout(idleSaveButton, 2000);
  }

  $scope.save = function() {
    $scope.errors = {};
    workingSaveButton();
    FormSvc
      .save(
        flow,
        form,
        getFormFields())
      .then(successSaveButton)
      .catch(function(resp) {
        $scope.errors = resp.data.errors;
        idleSaveButton();
      });
  }

  $scope.addField = function() {
    if (!$scope.fieldToAdd) return
    $scope.formFields.push($scope.fieldToAdd)
  }

  $scope.removeField = function($index) {
    $scope.formFields.splice($index, 1);
  }
  idleSaveButton();
}
