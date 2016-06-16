'use strict';

module.exports = function() {
  return {
    restrict: 'E',
    controller: 'SaveButtonCtrl',
    scope: {
      saveFn: '&',
      idleText: '@',
      disabled: '=?'
    },
    templateUrl: '/partials/saveButton.html'
  }
}
