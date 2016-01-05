'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');
var flowOverview = require('../fixtures/flowOverview')

describe('FlowOverviewCtrl', function() {
  var $scope
  var $stateParams
  var Fields
  var Flow
  var Forms
  var Locales
  var MailTemplates

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller) {
      $scope = $rootScope.$new()
      Fields = 'Fields'
      Flow = 'Flow'
      Forms = 'Forms'
      Locales = 'Locales'
      MailTemplates = 'MailTemplates'
      $controller(
        'FlowOverviewCtrl',
        {
          $scope: $scope,
          $stateParams: $stateParams,
          Fields: Fields,
          Flow: Flow,
          Forms: Forms,
          Locales: Locales,
          MailTemplates: MailTemplates
        }
      );
    });
  });

  describe('initial state', function() {
    it('should get a bunch of information about the flow', function() {
      assert.strictEqual($scope.flowFields, Fields)
      assert.strictEqual($scope.flow, Flow)
      assert.strictEqual($scope.flowForms, Forms)
      assert.strictEqual($scope.flowLocales, Locales)
      assert.strictEqual($scope.mailTemplates, MailTemplates)
    });
  });
});
