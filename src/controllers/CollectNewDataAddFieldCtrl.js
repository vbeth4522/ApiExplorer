'use strict';

var first = require('lodash/array/first');
var includes = require('lodash/collection/includes');

module.exports = function($controller, $scope, $state, $stateParams, FieldSvc, UtilSvc) {
  'ngInject';

  angular.extend(this, $controller('AddFieldCtrl', {$scope: $scope}));

  var sFn = UtilSvc.scopeHelpers($scope)
  var flow = $stateParams.flow;

  $scope.field.schemaAttribute = $stateParams.attribute.name;

  $scope.hideSchemaAttribute = true;

  $scope.save = function() {
    $scope.errors = {};
    return FieldSvc
      .addLocalized(
        flow,
        $scope.selectedLocale,
        UtilSvc.unpackTranslations($scope.selectedLocale, $scope.field)
      )
      .then(function(result) {
          return $state.go('collectNewData.addToForm', { flow: flow, field: result.data.name })
      })
      .catch(sFn.notifyErrorsAndReject)
  }
};
