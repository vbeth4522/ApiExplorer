'use strict';
var partialRight = require('lodash/function/partialRight');
var get = require('lodash/object/get');
var set = require('lodash/object/set');
var defaults = require('lodash/object/defaults');
var includes = require('lodash/collection/includes');
var isNull = require('lodash/lang/isNull');
var isUndefined = require('lodash/lang/isUndefined');

var types = [
  "boolean",
  "date",
  "dateTime",
  "decimal",
  "id",
  "integer",
  "ipAddress",
  "json",
  "object",
  "password",
  "plural",
  "string",
  "uuid"
]

var constraints = [
  "locally-unique",
  "unique",
  "required"
];

var features = [
  "primary-key",
  "query",
]

module.exports = function($scope) {
  'ngInject';

  function init() {
    $scope.addableConstraints = constraints.slice();
    $scope.addableFeatures = features.slice();
    $scope.types = types.slice()
  }

  $scope.move = function(index, source, target) {
    if (index >= 0) {
      var removed = get($scope, source).splice(index, 1)[0];
      var targetObject = get($scope, target);
      if (targetObject) {
        targetObject.push(removed);
      } else {
        set($scope, target, [removed]);
      }
    }
  }

  $scope.addNested = function(nested) {
    $scope.model.attr_defs.push(nested || {});
  }

  $scope.removeNested = function(index) {
    return $scope.model.attr_defs.splice(index, 1);
  }

  $scope.hasNested = function(type) {
    return includes(["plural", "object"], (type || $scope.model.type));
  }

  $scope.hasLength = function(type) {
    return includes(["string"], (type || $scope.model.type));
  }

  $scope.hasCaseSensitive = function(type) {
    return includes(["string"], (type || $scope.model.type));
  }

  $scope.pathName = function() {
    var parentName = $scope.parentName;
    var name = $scope.model.name
    return (parentName ? parentName + '.' :  '') + (name || "");
  }

  $scope.$watch('model.type', function(newValue) {
    if ($scope.hasNested(newValue)) {
      $scope.model.attr_defs = [{}]
    } else {
      $scope.saved_attr_defs = $scope.model.attr_defs;
      delete $scope.model.attr_defs
    }
    if ($scope.hasCaseSensitive()){
      $scope.model.case_sensitive = true;
    } else {
      delete $scope.model.case_sensitive;
    }
  })

  $scope.$watch('model.length', function(newValue) {
    if (isNull(newValue) || isUndefined(newValue)) {
      delete $scope.model.length
    }
  })

  $scope.addConstraint = partialRight($scope.move, 'addableConstraints', 'model.constraints');
  $scope.removeConstraint = partialRight($scope.move, 'model.constraints', 'addableConstraints');
  $scope.addFeature = partialRight($scope.move, 'addableFeatures', 'model.features');
  $scope.removeFeature = partialRight($scope.move, 'model.features', 'addableFeatures');

  init();
}
