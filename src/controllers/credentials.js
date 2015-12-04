'use strict';

module.exports = function($scope, $state, CredentialSvc) {
  $scope.load = function() {
    CredentialSvc.set($scope.appId, $scope.clientId, $scope.clientSecret)
    $state.go('listFlows', {}, { reload: true })
  }

  var creds = CredentialSvc.get();
  if (creds.appId && creds.clientId && creds.clientSecret) {
    $scope.appId = creds.appId;
    $scope.clientId = creds.clientId;
    $scope.clientSecret = creds.clientSecret;
    // $scope.load()
  }
}
