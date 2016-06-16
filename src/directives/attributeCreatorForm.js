'use strict';
var defaults = require('lodash/object/defaults');

module.exports = function() {
  return {
    restrict: 'E',
    scope: {
      model: '=?',
      parentName: '@'
    },
    replace: true,
    controller: 'AttributeCreatorFormCtrl',
    templateUrl: '/partials/attributeCreatorForm.html'
  }
}
