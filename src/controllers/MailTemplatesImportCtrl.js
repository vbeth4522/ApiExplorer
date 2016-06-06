'use strict';
var partialRight = require('lodash/function/partialRight');

module.exports = function($scope, $stateParams, MailTemplateSvc, FileReaderSvc, ZipSvc) {
  'ngInject';

  var flow = $stateParams.flow

  function init() {
    $scope.results = [];
  }

  $scope.import = function() {
    return FileReaderSvc.readAsArrayBuffer($scope.file)
      .then(partialRight(ZipSvc.unzipMailTemplates, uploadMailTemplates));
  }

  function uploadMailTemplates(locale, name, mailTemplate) {
    $scope.results = [];
    return MailTemplateSvc
      .serialSave(flow, locale, name, mailTemplate)
      .then(function() {
        $scope.results.push({ locale: locale, name: name, success: true });
      })
      .catch(function() {
        $scope.results.push({ locale: locale, name: name, success: false });
      })
  }

  init();
}
