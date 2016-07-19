'use strict';

var _ = require('lodash');

module.exports = function($scope, $state, $stateParams, FormSvc, UtilSvc) {
  'ngInject';

  var sFn = UtilSvc.scopeHelpers($scope)

  function init() {
    $scope.flow = $stateParams.flow;
    $scope.field = $stateParams.field;
    FormSvc
      .getAll($scope.flow)
      .then(function(result) {
        $scope.forms = _(result)
          .get('data', [])
          .map(function(each) {
            return _.get(each, 'name');
          });
      })
      .catch(sFn.notifyErrorsAndReject)
  }

  $scope.save = function(flow, form) {
    return FormSvc
      .get(flow, form)
      .then(function(result) {
        var formData = _(result).get('data', {});
        var formFields = _(formData)
          .get('fields', [])
          .map(function(each) {
            return _.pick(each, ['name']);
          });
        if (!_.includes(formFields, form)) {
          return FormSvc
            .save(flow, form, { fields: formFields.concat([{ name: $scope.field }]) })
            .catch(sFn.notifyErrorsAndReject)
        }
      })
      .catch(sFn.notifyErrorsAndReject)
      .then(function() {
        $state.go('flowOverview', { flow: flow });
      })
  }


  init();
};
