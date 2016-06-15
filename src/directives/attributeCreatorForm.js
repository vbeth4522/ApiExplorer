'use strict';

module.exports = function() {
  return {
    restrict: 'E',
    scope: {
      model: '=?'
    },
    replace: true,
    controller: 'AttributeCreatorFormCtrl',
    templateUrl: '/partials/attributeCreatorForm.html'
  }
}
