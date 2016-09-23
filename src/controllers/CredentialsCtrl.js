'use strict';
var isEmpty = require('lodash/lang/isEmpty');

module.exports = function($scope, $state, CredentialSvc) {
  'ngInject';

  function updateScopeCredentials() {
    if (!$scope.hasCreds()) {
      $state.go('auth', {}, { reload: false })
    }
    var credentials = CredentialSvc.get();
    $scope.appId = credentials.appId;
    $scope.clientId = credentials.clientId;
    $scope.clientSecret = credentials.clientSecret;
  }

  $scope.load = function() {
    CredentialSvc.set($scope.appId, $scope.clientId, $scope.clientSecret)
    $state.go('home', {}, { reload: true })
  }

  $scope.clear = function() {
    CredentialSvc.clear()
    $state.go('auth', {}, { reload: true })
  };

  $scope.hasCreds = function() {
     return CredentialSvc.hasAnyCreds();
  };

  $scope.$on('credentialsUpdated', updateScopeCredentials);
  $scope.$on('regionUpdated', updateScopeCredentials);

  updateScopeCredentials(null, CredentialSvc.get());
}
