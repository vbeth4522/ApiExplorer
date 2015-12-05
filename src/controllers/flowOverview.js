'use strict';
var pluck = require('lodash/collection/pluck');

module.exports = function($scope, $http, $stateParams, FlowSvc, FieldSvc, FormSvc) {
  var flow = $stateParams.flow

  FlowSvc
    .get(flow)
    .then(function(resp) {
      $scope.flow = resp.data
    });
  FieldSvc
    .getAll(flow)
    .then(function(resp) {
    $scope.flowFields = pluck(resp.data, 'name')
  });
  FormSvc
    .getAll(flow)
    .then(function(resp) {
      $scope.flowForms = pluck(resp.data, 'name')
    });

}
