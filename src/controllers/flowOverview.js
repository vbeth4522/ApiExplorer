'use strict';
var pluck = require('lodash/collection/pluck');

module.exports = function($scope, $http, $stateParams, CredentialSvc) {
  var creds = CredentialSvc.get()
  var flow = $stateParams.flow

  $http({
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(creds.clientId + ':' + creds.clientSecret)
    },
    url: '/beta/config/' + creds.appId + '/flows/' + flow
  }).then(function(resp) {
    $scope.flow = resp.data
  });

  $http({
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(creds.clientId + ':' + creds.clientSecret)
    },
    url: '/beta/config/' + creds.appId + '/flows/' + flow + '/fields'
  }).then(function(resp) {
    $scope.flowFields = pluck(resp.data, 'name')
  });

  $http({
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(creds.clientId + ':' + creds.clientSecret)
    },
    url: '/beta/config/' + creds.appId + '/flows/' + flow + '/forms'
  }).then(function(resp) {
    $scope.flowForms = pluck(resp.data, 'name')
  });

}
