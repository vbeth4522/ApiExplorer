'use strict';

var constant = require('lodash/utility/constant');
var partial = require('lodash/function/partial');

var commonClasses = constant(['btn', 'btn-lg', 'btn-block'])

module.exports = function($scope, $timeout) {
  function state(text, disabled, klass) {
    $scope.text = text
    $scope.disabled = disabled;
    $scope.classes = commonClasses().concat([klass])
  }

  var idleState = partial(state, $scope.idleText, false, 'btn-primary')
  var workingState = partial(state, 'Saving...', true, 'btn-primary')
  var successState = partial(state, 'Success!', false, 'btn-success')
  var errorState = partial(state, 'Error', true, 'btn-danger')

  var eventuallyIdle = partial($timeout, idleState, 2000)

  $scope.save = function() {
    workingState();
    $scope
      .saveFn()
      .then(successState)
      .catch(errorState)
      .finally(eventuallyIdle)
  }

  idleState()
}
