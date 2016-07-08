'use strict';

var _ = require('lodash');

module.exports = function($scope, $state, $stateParams, $q, Schemas, SchemaSvc, FlowSvc) {
  'ngInject';

  function init() {
    $scope.schemas = Schemas;
    $scope.flow = $stateParams.flow;
    $scope.attributes = [];
    $scope.schemaActive = true;
    $scope.flowSchemas  = [];
  }

  function changeState(flow, schema, attribute) {
    if (!attribute) {
      // Attribute was not given. Redirect to addAtribute page.
      return $q.when(
        $state.go('collectNewData.addAttribute', { flow: flow, schema: schema })
      );
    } else {
      // Attribute was given. Redirect to addFeild.
      return $q.when(
        $state.go('collectNewData.addField', { flow: flow, schema: schema, attribute: attribute })
      );
    }
  }

  $scope.select = function(flow, schema, attribute) {
    if (!flow) { return $q.rejected("Invalid flow:", flow) }
    if (!schema) { return $q.rejected("Invalid schema:", schema) }

    if (!$scope.schemaActive) {
      var schemas = $scope.flowSchemas.concat(schema);
      return FlowSvc
        .save(flow, { schemas: schemas })
        .then(function() {
          return changeState(flow, schema, attribute);
        })
    } else {
      return changeState(flow, schema, attribute);
    }
  }

  $scope.hasAttributes = function() {
    return !!$scope.attributes.length;
  }

  $scope.$watch('schema', function(newValue) {
    if (newValue) {
      $scope.attributes = [];
      $scope.attribute = undefined;
      FlowSvc
        .get($scope.flow)
        .then(function(result) {
          $scope.flowSchemas = _(result).get('data.schemas', ['user']);
          $scope.schemaActive = _($scope.flowSchemas).includes(newValue);
        })
        .then(function() {
          return SchemaSvc.get(newValue);
        })
        .then(function(result) {
          $scope.attributes = _(result.data)
            .map('schemaAttribute')
            .filter(_.isString)
            .value();
        })
    }
  })

  init();
}
