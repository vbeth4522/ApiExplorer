'use strict';
var pluck = require('lodash/collection/pluck');

module.exports = function($scope, $http, CredentialSvc) {
  var creds = CredentialSvc.get()
  $http({
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(creds.clientId + ':' + creds.clientSecret)
    },
    url: '/beta/config/' + creds.appId + '/flows/'
  }).then(function(resp) {
    console.log(resp)
    $scope.flowNames = pluck(resp.data, 'name')
    console.log($scope.flowNames)
  });

}
