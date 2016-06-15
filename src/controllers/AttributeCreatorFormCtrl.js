'use strict';
var partialRight = require('lodash/function/partialRight');
var get = require('lodash/object/get');
var set = require('lodash/object/set');
var defaults = require('lodash/object/defaults');

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
  "required",
  "default",
  "ignore-update",
  "to-lower",
  "to-upper",
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

  $scope.addConstraint = partialRight($scope.move, 'addableConstraints', 'model.constraints');
  $scope.removeConstraint = partialRight($scope.move, 'model.constraints', 'addableConstraints');
  $scope.addFeature = partialRight($scope.move, 'addableFeatures', 'model.features');
  $scope.removeFeature = partialRight($scope.move, 'model.features', 'addableFeatures');

  init();
}
