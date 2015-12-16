'use strict';
var pluck = require('lodash/collection/pluck');
var includes = require('lodash/collection/includes');

module.exports = function($scope, $stateParams, $timeout, LocaleSvc, TranslationSvc) {
  var flow = $stateParams.flow
  $scope.referenceLocale = 'en-US'
  $scope.selectedLocale = 'en-US'
  $scope.trFilter = ''

  LocaleSvc
    .getAll(flow)
    .then(function(resp) {
      $scope.locales = pluck(resp.data, 'name')
    });
  TranslationSvc
    .getAll(flow)
    .then(function(translations) {
      $scope.translations = translations
    });

  function idleSaveButton() {
    $scope.saveButtonText = "Update Translations"
    $scope.saveButtonDisabled = false;
    $scope.saveButtonClasses = [
      'btn',
      'btn-primary',
      'btn-lg',
      'btn-block'
    ]
  }

  function workingSaveButton() {
    $scope.saveButtonText = "Updating..."
    $scope.saveButtonDisabled = true;
    $scope.saveButtonClasses = [
      'btn',
      'btn-primary',
      'btn-lg',
      'btn-block'
    ]
  }

  function successSaveButton() {
    $scope.saveButtonText = "Success!"
    $scope.saveButtonDisabled = false;
    $scope.saveButtonClasses = [
      'btn',
      'btn-success',
      'btn-lg',
      'btn-block'
    ]
    $timeout(idleSaveButton, 2000);
  }

  $scope.save = function() {
    $scope.errors = {};
    workingSaveButton();
    TranslationSvc
      .update(
        flow,
        // Optimize this later to only send what changed.
        $scope.translations)
      .then(successSaveButton)
      .catch(function(resp) {
        // There's much that can be done with these :)
        $scope.errors = resp.data.errors;
        idleSaveButton();
      });
  }

  $scope.matchesSearch = function(keyOrPath) {
    if ($scope.trFilter === '') return true;
    return includes(keyOrPath.toLowerCase(), $scope.trFilter);
  }
  idleSaveButton()
}
