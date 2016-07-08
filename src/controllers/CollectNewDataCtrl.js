'use strict';

var first = require('lodash/array/first');
var includes = require('lodash/collection/includes');

var steps = [
  ['collectNewData', 'collectNewData.selectAttribute', 'collectNewData.addAttribute'],
  ['collectNewData.addField'],
  ['collectNewData.addToForm']
]

module.exports = function($scope, $state, $stateParams) {
  'ngInject';

  var flow = $stateParams.flow;

  $scope.$on('$stateChangeSuccess', function() {
    if ($state.current.name == 'collectNewData') {
      $state.go('collectNewData.selectAttribute', { flow: flow });
    }
  })

  $scope.onStep = function(step) {
    return includes(steps[step-1], $state.current.name);
  }

};
