'use strict';

module.exports = function() {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      validationFormats: '=',
      allFields: '=',
      selectedLocale: '=',
      translatable: '@'
    },
    templateUrl: '/public/partials/fieldValidation.html'
  }
}
