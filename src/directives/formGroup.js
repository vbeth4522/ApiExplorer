var defaults = require('lodash/object/defaults');

module.exports = function() {
  return {
    restrict: 'E',
    templateUrl: "/partials/formGroup.html",
    replace: true,
    transclude: true,
    controller: "FormGroup",
    scope: {
      label: '@',
      name: '@',
      // Optional (Have defaults)
      formGroupClass: '@?',
      formName: '@?'
    },
    link: function(scope){
      defaults(scope, {
        formGroupClass: "form-group",
        formName: "form"
      });
    }
  };
};
