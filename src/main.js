var angular = require('angular');
var flowOverviewResolvers = require('./resolvers/FlowOverviewResolvers')
var homeResolvers = require('./resolvers/HomeResolvers')
var schemaOverviewResolvers = require('./resolvers/SchemaOverviewResolvers')
window.jQuery = require('jquery')
require('bootstrap')
require('angular-breadcrumb');
require('angular-drag-and-drop-lists')

angular.module(
  'capi-ui',
  [
    'ncy-angular-breadcrumb',
    'dndLists',
    require('angular-loading-bar'),
    require('angular-sanitize'),
    require('angular-ui-bootstrap'),
    require('angular-ui-router'),
    require('ng-file-upload'),
  ]
)

.config(function($stateProvider, $httpProvider) {
  'ngInject';

  $stateProvider
    // This is just a placeholder, probably do something with this in the
    // future.
    .state('auth', {
      url: '',
      templateUrl: '/partials/login.html',
      controller: function() {},
      ncyBreadcrumb: {
        label: 'Welcome'
      }
    })
    .state('home', {
      url: '/home',
      templateUrl: '/partials/home.html',
      controller: 'HomeCtrl',
      resolve: homeResolvers,
      ncyBreadcrumb: {
        label: 'Home'
      }
    })
    .state('flowOverview', {
      url: '/flows/:flow',
      templateUrl: '/partials/flowOverview.html',
      controller: 'FlowOverviewCtrl',
      resolve: flowOverviewResolvers,
      ncyBreadcrumb: {
        label: 'Flow Overview',
        parent: 'home'
      }
    })
    .state('fieldOverview', {
      url: '/flows/:flow/fields/:field',
      templateUrl: '/partials/fieldOverview.html',
      controller: 'FieldOverviewCtrl',
      ncyBreadcrumb: {
        label: 'Field: {{fieldName}}',
        parent: 'flowOverview'
      }
    })
    .state('formOverview', {
      url: '/flows/:flow/forms/:form',
      templateUrl: '/partials/formOverview.html',
      controller: 'FormOverviewCtrl',
      ncyBreadcrumb: {
        label: 'Form: {{form}}',
        parent: 'flowOverview'
      }
    })
    .state('fieldOverveiwFromForm', {
      url: '/flows/:flow/forms/:form/fields/:field',
      templateUrl: '/partials/fieldOverview.html',
      controller: 'FieldOverviewCtrl',
      ncyBreadcrumb: {
        label: 'Field: {{fieldName}}',
        parent: 'formOverview'
      }
    })
    .state('schemaOverview', {
      url: '/schema/:schema',
      templateUrl: '/partials/schemaOverview.html',
      controller: 'SchemaOverviewCtrl',
      resolve: schemaOverviewResolvers,
      ncyBreadcrumb: {
        label: 'Schema: {{schema}}',
        parent: 'home'
      }
    })
    .state('translations', {
      url: '/flows/:flow/translations',
      templateUrl: '/partials/translations.html',
      controller: 'TranslationsCtrl',
      ncyBreadcrumb: {
        label: 'Translations',
        parent: 'flowOverview'
      }
    })
    .state('mailTemplateOverview', {
      url: '/flows/:flow/mailTemplates/:template',
      templateUrl: '/partials/mailTemplateOverview.html',
      controller: 'MailTemplateCtrl',
      ncyBreadcrumb: {
        label: 'Mail Template',
        parent: 'flowOverview'
      }
    })
    .state('mailTemplatesImport', {
      url: '/flows/:flow/importMailTemplates',
      templateUrl: '/partials/mailTemplatesImport.html',
      controller: 'MailTemplatesImportCtrl',
      resolve: flowOverviewResolvers,
      ncyBreadcrumb: {
        label: 'Import Mail Templates',
        parent: 'flowOverview'
      }
    })
    .state('mailTemplatesExport', {
      url: '/flows/:flow/exportMailTemplates',
      templateUrl: '/partials/mailTemplatesExport.html',
      controller: 'MailTemplatesExportCtrl',
      resolve: flowOverviewResolvers,
      ncyBreadcrumb: {
        label: 'Export Mail Templates',
        parent: 'flowOverview'
      }
    })
    .state('addField', {
      url: '/flows/:flow/addField',
      templateUrl: '/partials/fieldOverview.html',
      controller: 'AddFieldCtrl',
      ncyBreadcrumb: {
        label: 'Add Field',
        parent: 'flowOverview'
      }
    })

  var commonPutAndPostHeaders = {
    'Content-Type': 'application/json'
  }
  $httpProvider.defaults.headers.post = commonPutAndPostHeaders
  $httpProvider.defaults.headers.put = commonPutAndPostHeaders
})

require('./controllers')
require('./directives')
require('./services')
