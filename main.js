var angular = require('angular');
require('angular-breadcrumb');

angular.module(
  'capi-ui',
  [
    require('angular-ui-router'),
    'ncy-angular-breadcrumb',
    require('angular-loading-bar'),
    require('angular-ui-bootstrap')
  ]
)

.config(function($stateProvider) {
  $stateProvider
    // This is just a placeholder, probably do something with this in the
    // future.
    .state('auth', {
      url: '',
      templateUrl: '/public/partials/home.html',
      controller: function() {},
      ncyBreadcrumb: {
        label: 'Welcome'
      }
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
      url: '/flows/:flow/fields/:field',
      templateUrl: '/public/partials/fieldOverview.html',
      controller: 'FieldOverviewCtrl',
      ncyBreadcrumb: {
        label: 'Field',
        parent: 'flowOverview'
      }
    })
    .state('formOverview', {
      url: '/flows/:flow/forms/:form',
      templateUrl: '/public/partials/formOverview.html',
      controller: 'FormOverviewCtrl',
      ncyBreadcrumb: {
        label: 'Form',
        parent: 'flowOverview'
      }
    })
})

require('./src/services')
require('./src/controllers')
require('./src/directives')
