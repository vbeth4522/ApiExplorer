var angular = require('angular');
require('angular-breadcrumb')

angular.module('capi-ui', [require('angular-ui-router'), 'ncy-angular-breadcrumb'])

.config(function($stateProvider) {
  $stateProvider
    // This is just a placeholder, probably do something with this in the
    // future.
    .state('auth', {
      url: '',
    })
    .state('flows', {
      url: '/flows',
      templateUrl: '/public/partials/flowList.html',
      controller: 'FlowListCtrl',
      ncyBreadcrumb: {
        label: 'Flows'
      }
    })
    .state('flowOverview', {
      url: '/flows/:flow',
      templateUrl: '/public/partials/flowOverview.html',
      controller: 'FlowOverviewCtrl',
      ncyBreadcrumb: {
        label: 'Flow Overview',
        parent: 'flows'
      }
    })
    .state('fieldOverview', {
      url: '/flows/:flow/:field',
      templateUrl: '/public/partials/fieldOverview.html',
      controller: 'FieldOverviewCtrl',
      ncyBreadcrumb: {
        label: 'Field',
        parent: 'flowOverview'
      }
    })
})

require('./src/services')
require('./src/controllers')
