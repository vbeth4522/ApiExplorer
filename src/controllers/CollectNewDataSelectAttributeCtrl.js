'use strict';

var _ = require('lodash');

module.exports = function($scope, $state, $stateParams, $q, SchemaSvc, FlowSvc, UtilSvc) {
  'ngInject';

  var sFn = UtilSvc.scopeHelpers($scope)

  function init() {
    $scope.flow = $stateParams.flow;
    $scope.schemaAttributes = [];
    SchemaSvc.getAllIntersect()
      .then(sFn.pluckPropToScope('schemaAttribute', 'schemaAttributes'))
  }

  function changeState(flow, attribute) {
    if (!attribute) {
      // Attribute was not given. Redirect to addAttribute page.
      return $q.when(
        $state.go('collectNewData.addAttribute', { flow: flow })
      );
    } else {
      // Attribute was given. Redirect to addField.
      return $q.when(
        $state.go('collectNewData.addField', { flow: flow, attribute: attribute, })
      );
    }
  }

  $scope.select = function(flow, attribute) {
    if (!flow) { return $q.rejected("Invalid flow:", flow) }
    return changeState(flow, attribute);
  }

  $scope.hasAttributes = function() {
    return !!$scope.schemaAttributes.length;
  }

  init();
}
