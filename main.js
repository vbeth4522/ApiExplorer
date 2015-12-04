var angular = require('angular');
var _ = require('lodash');

angular.module('capi-ui', [])
.controller('FlowListController', function($scope, $http) {

  $scope.loadFlows = function() {
    if (!($scope.clientId && $scope.clientSecret)) {
      console.log("gimme creds!")
      return
    }
    $http({
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa($scope.clientId + ':' + $scope.clientSecret)
      },
      url: '/beta/config/' + $scope.appId + '/flows/'
    }).then(function(resp) {
      console.log(resp)
      $scope.flowNames = _.pluck(resp.data, 'name')
      console.log($scope.flowNames)
    });
  }
});
