'use strict';
var pluck = require('lodash/collection/pluck');

module.exports = function($scope, $stateParams, FieldSvc, LocaleSvc) {
  var flow = $stateParams.flow
  var field = $stateParams.field

  $scope.emptyValue = ""
  $scope.locales = ['en-US']
  $scope.selectedLocale = $scope.locales[0]

  LocaleSvc
    .getAll(flow)
    .then(function(resp) {
      $scope.locales = pluck(resp.data, 'name')
    });

  FieldSvc
    .get(flow, field)
    .then(function(resp) {
      $scope.field = resp.data
    });

}
