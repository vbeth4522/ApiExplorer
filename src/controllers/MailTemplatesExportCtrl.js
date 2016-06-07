'use strict';
var partialRight = require('lodash/function/partialRight');
var saveAs = require('file-saver').saveAs;

module.exports = function($scope, $stateParams, $q, Flow, UtilSvc, MailTemplateSvc, LocaleSvc, ZipSvc) {
  'ngInject';

  var sFn = UtilSvc.scopeHelpers($scope)
  var flow = $stateParams.flow
  var version = Flow.version

  function init() {
    $scope.locales = [];
    $scope.mailTemplates = [];
    $scope.addableLocales = [];
    $scope.addableMailTemplates = [];

    MailTemplateSvc
      .getAll(flow)
      .then(sFn.pluckNameToScope('mailTemplates'));
    LocaleSvc
      .getAll(flow)
      .then(sFn.pluckNameToScope('locales'));
  }

  $scope.move = function(index, source, target) {
    if (index >= 0) {
      var removed = $scope[source].splice(index, 1)[0];
      $scope[target].push(removed);
    }
  }

  $scope.addMailTemplate = partialRight($scope.move, 'addableMailTemplates', 'mailTemplates');
  $scope.removeMailTemplate = partialRight($scope.move, 'mailTemplates', 'addableMailTemplates');
  $scope.addLocale = partialRight($scope.move, 'addableLocales', 'locales');
  $scope.removeLocale = partialRight($scope.move, 'locales', 'addableLocales');

  $scope.export = function() {
    var promises = [];
    $scope.locales.map(function(locale) {
      $scope.mailTemplates.map(function(mailTemplate) {
        promises.push(getMailTemplate(flow, locale, mailTemplate));
      });
    })
    var fileName = createFileName(flow, version)
    return $q.all(promises)
      .then(partialRight(ZipSvc.zipMailTemplates, fileName))
      .then(ZipSvc.dump)
      .then(partialRight(saveAs, fileName+'.zip'))
  }

  function getMailTemplate(flow, locale, mailTemplate) {
    return MailTemplateSvc
      .get(flow, locale, mailTemplate)
      .then(function(response) {
        return [locale, response.data];
      })
  }

  function createFileName(flowName, flowVersion ) {
    return 'mailTemplates-'+flowName+'-'+flowVersion
  }

  init();
}
