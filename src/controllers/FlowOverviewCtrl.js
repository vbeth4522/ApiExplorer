'use strict';

module.exports = function($scope, Fields, Flow, Forms, Locales, MailTemplates) {
  'ngInject';

  $scope.flow = Flow
  $scope.flowFields = Fields
  $scope.flowForms = Forms
  $scope.flowLocales = Locales
  $scope.mailTemplates = MailTemplates
}
