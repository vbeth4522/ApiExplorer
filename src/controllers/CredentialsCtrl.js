'use strict';

module.exports = function($scope, $state, CredentialSvc) {
  function updateScopeCredentials(creds) {
    $scope.appId = creds.appId;
    $scope.clientId = creds.clientId;
    $scope.clientSecret = creds.clientSecret;
  }

  $scope.load = function() {
    CredentialSvc.set($scope.appId, $scope.clientId, $scope.clientSecret)
    $state.go('flows', {}, { reload: true })
  }

  $scope.clear = function() {
    CredentialSvc.clear()
    $state.go('auth', {}, { reload: true })
  };

  $scope.hasCreds = function() {
    var creds = CredentialSvc.get()
    return creds.appId && creds.clientId && creds.clientSecret
  };

  $scope.$on('credentialsUpdated', updateScopeCredentials)

  updateScopeCredentials(CredentialSvc.get());
}
