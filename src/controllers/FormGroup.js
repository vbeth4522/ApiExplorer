'use strict';
var get = require('lodash/object/get');

module.exports = function($scope) {
  'ngInject';

  function init() {};

  $scope.formGroupClassOptions = function() {
    return {
      "has-success": $scope.states.success(),
      "has-warning": $scope.states.warning(),
      "has-error": $scope.states.danger()
    };
  };

  $scope.states = {
    success: function() { return $scope.isValid(); },
    warning: function() { return $scope.isInvalid() && $scope.isPristine(); },
    danger:  function() { return $scope.isInvalid() && $scope.isDirty(); }
  };

  $scope.isValid = function () {
    var field = $scope.getField();
    return field && field.$valid;
  };

  $scope.isInvalid = function () {
    var field = $scope.getField();
    return field && field.$invalid;
  };

  $scope.isPristine = function () {
    var field = $scope.getField();
    return field && field.$pristine;
  };

  $scope.isDirty = function () {
    var field = $scope.getField();
    return field && field.$dirty;
  };

  $scope.getField = function() {
    return get($scope, [$scope.formName, $scope.name]);
  };

  init();
};
