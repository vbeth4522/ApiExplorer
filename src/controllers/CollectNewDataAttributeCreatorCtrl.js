'use strict';
var omit = require('lodash/object/omit');

module.exports = function($scope, $state, $stateParams, $q, SchemaSvc, UtilSvc) {
  'ngInject';

  var sFn = UtilSvc.scopeHelpers($scope)

  $scope.flow = $stateParams.flow;
  $scope.attribute = {}

  $scope.create = function() {
    return SchemaSvc.getAll()
      .then(function(result) {
        return $q.all( result.data.map( function(schema) {
          return SchemaSvc
            .addAttribute(schema.name, $scope.attribute.name, $scope.attribute)
            .then(function(result) {
              result.data.success = $scope.attribute.name + " successfully added to " + schema.name + ".";
              return result;
            });
        }))
        .then(function(results) {
          $state.go('collectNewData.addAttributeStatus', {
            flow: $scope.flow,
            attribute: $scope.attribute,
            results: results
          })
        })
        .catch(sFn.notifyErrorsAndReject);
      });
  }
}
