'use strict';
var pluck = require('lodash/collection/pluck');

module.exports = function($scope, $http, $stateParams, CredentialSvc) {
  var creds = CredentialSvc.get()
  var flow = $stateParams.flow
  var field = $stateParams.field

  $scope.emptyValue = ""
  $scope.locales = ['en-US']
  $scope.selectedLocale = $scope.locales[0]

  $http({
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(creds.clientId + ':' + creds.clientSecret)
    },
    url: '/beta/config/' + creds.appId + '/flows/' + flow + '/locales'
  }).then(function(resp) {
    $scope.locales = pluck(resp.data, 'name')
  });

  $http({
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(creds.clientId + ':' + creds.clientSecret)
    },
    url: '/beta/config/' + creds.appId + '/flows/' + flow + '/fields/' + field
  }).then(function(resp) {
    $scope.field = resp.data
  });

}
