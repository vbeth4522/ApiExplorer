'use strict';
var pluck = require('lodash/collection/pluck');

module.exports = function(
  $http,
  $scope,
  $stateParams,
  FieldSvc,
  FlowSvc,
  FormSvc,
  LocaleSvc,
  MailTemplateSvc
) {
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
  MailTemplateSvc
    .getAll(flow)
    .then(function(resp) {
      $scope.mailTemplates = pluck(resp.data, 'name')
    });
  LocaleSvc
    .getAll(flow)
    .then(function(resp) {
      $scope.flowLocales = pluck(resp.data, 'name')
    });

}
