'use strict';
var pluck = require('lodash/collection/pluck');

module.exports = function($scope, $state, $stateParams) {
  'ngInject';

  var results = $stateParams.results;

  function init() {
    $scope.report = [];
    for (var i = 0; i < results.length; i++ ) {
        switch(results[i].status) {
            case 200:
                $scope.report.push({
                    message: results[i].data.success,
                    success: true
                });
                break;
            default:
                $scope.report.push({
                    message: results[i].data.errors,
                    success: false
                });
        }
    }
  }

  $scope.back = function() {
    $state.go('collectNewData.addAttribute', {
        flow: $stateParams.flow
    });
  }

  $scope.continue = function() {
    $state.go('collectNewData.addField', {
      flow: $stateParams.flow,
      attribute: $stateParams.attribute
    });
  }

  init();
};
