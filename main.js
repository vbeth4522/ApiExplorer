var angular = require('angular');

angular.module('capi-ui', [require('angular-ui-router')])

.config(function($stateProvider) {
  $stateProvider
    // This is just a placeholder, probably do something with this in the
    // future.
    .state('auth', {
      url: '',
    })
    .state('listFlows', {
      url: '/flows',
      templateUrl: '/public/partials/flowList.html',
      controller: 'FlowListCtrl'
    })
    .state('flowOverview', {
      url: '/flows/:flow',
      templateUrl: '/public/partials/flowOverview.html',
      controller: 'FlowOverviewCtrl',
    })
})

require('./src/services')
require('./src/controllers')
