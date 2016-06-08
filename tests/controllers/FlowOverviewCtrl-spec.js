'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');
var flowOverview = require('../fixtures/flowOverview')

describe('FlowOverviewCtrl', function() {
  var locals

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller) {
      locals = {
        $scope: $rootScope.$new(),
        Fields: 'Fields',
        Flow: 'Flow',
        Forms: 'Forms',
        Locales: 'Locales',
        MailTemplates: 'MailTemplates'
      }
      $controller('FlowOverviewCtrl', locals);
    });
  });

  describe('initial state', function() {
    it('should get a bunch of information about the flow', function() {
      assert.strictEqual(locals.$scope.flowFields, locals.Fields)
      assert.strictEqual(locals.$scope.flow, locals.Flow)
      assert.strictEqual(locals.$scope.flowForms, locals.Forms)
      assert.strictEqual(locals.$scope.flowLocales, locals.Locales)
      assert.strictEqual(locals.$scope.mailTemplates, locals.MailTemplates)
    });
  });
});
