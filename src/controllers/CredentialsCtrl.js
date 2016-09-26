'use strict';

module.exports = function($scope, $state, CredentialSvc) {
  'ngInject';

  function updateScopeCredentials() {
    var creds = CredentialSvc.get();
    if (!(creds.appId && creds.clientId && creds.clientSecret)) {
      $state.go('auth', {}, { reload: false })
    }
    $scope.appId = creds.appId;
    $scope.clientId = creds.clientId;
    $scope.clientSecret = creds.clientSecret;
  }

  $scope.load = function() {
    CredentialSvc.set($scope.appId, $scope.clientId, $scope.clientSecret);
    $state.go('home', {}, { reload: true })
  };

  $scope.clear = function() {
    CredentialSvc.clear();
    $state.go('auth', {}, { reload: true })
  };

  $scope.hasCreds = function() {
     return CredentialSvc.hasAnyCreds();
  };

  $scope.$on('credentialsUpdated', updateScopeCredentials);
  $scope.$on('regionUpdated', updateScopeCredentials);

  updateScopeCredentials(null, CredentialSvc.get());
}
