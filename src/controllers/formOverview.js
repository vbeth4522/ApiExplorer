'use strict';
var pluck = require('lodash/collection/pluck');
var each = require('lodash/collection/each');
var first = require('lodash/array/first');

module.exports = function($scope, $http, $stateParams, FieldSvc, FormSvc, LocaleSvc) {
  var flow = $stateParams.flow
  var form = $stateParams.form
  $scope.form = form
  $scope.formFields = []
  $scope.emptyValue = ""
  $scope.locales = ['en-US']
  $scope.selectedLocale = first($scope.locales)

  function loadFields(fields) {
    each(fields, function(field) {
      FieldSvc
        .get(flow, field)
        .then(function(resp) {
          // Need to make sure these get ordered correctly
          $scope.formFields.push(resp.data)
        });
    });
  }

  FormSvc
    .get(flow, form)
    .then(function(resp) {
      $scope.formFieldNames = pluck(resp.data.fields, 'name')
      loadFields($scope.formFieldNames)
    });
  LocaleSvc
    .getAll(flow)
    .then(function(resp) {
      $scope.locales = pluck(resp.data, 'name')
    });
  window.sc = $scope
}
