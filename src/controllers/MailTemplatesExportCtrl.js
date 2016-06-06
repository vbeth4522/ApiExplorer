'use strict';
var partialRight = require('lodash/function/partialRight');
var saveAs = require('file-saver').saveAs;

module.exports = function($scope, $stateParams, $q, UtilSvc, MailTemplateSvc, LocaleSvc, ZipSvc) {
  'ngInject';

  var sFn = UtilSvc.scopeHelpers($scope)
  var flow = $stateParams.flow

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

  $scope.addMailTemplate = function(index) {
    if (index >= 0) {
      var removed = $scope.addableMailTemplates.splice(index, 1)[0];
      $scope.mailTemplates.push(removed);
    }
  }

  $scope.removeMailTemplate = function(index) {
    if (index >= 0) {
      var removed = $scope.mailTemplates.splice(index, 1)[0];
      $scope.addableMailTemplates.push(removed);
    }
  }

  $scope.addLocale = function(index) {
    if (index >= 0) {
      var removed = $scope.addableLocales.splice(index, 1)[0];
      $scope.locales.push(removed);
    }
  }

  $scope.removeLocale = function(index) {
    if (index >= 0) {
      var removed = $scope.locales.splice(index, 1)[0];
      $scope.addableLocales.push(removed);
    }
  }

  $scope.export = function() {
    var promises = [];
    $scope.locales.map(function(locale) {
      $scope.mailTemplates.map(function(mailTemplate) {
        promises.push(getMailTemplate(flow, locale, mailTemplate));
      });
    })
    return $q.all(promises)
      .then(ZipSvc.zipMailTemplates)
      .then(ZipSvc.dump)
      .then(partialRight(saveAs, 'mailTemplates.zip'))
  }

  function getMailTemplate(flow, locale, mailTemplate) {
    return MailTemplateSvc
      .get(flow, locale, mailTemplate)
      .then(function(response) {
        return [locale, response.data];
      })
  }

  init();
}
