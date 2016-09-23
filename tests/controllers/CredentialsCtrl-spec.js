'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');
var helpers = require('../helpers')

describe('CredentialsCtrl', function() {
  var locals

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller) {
      locals = {
        $scope: $rootScope.$new(),
        $state: helpers.make$StateStub(),
        CredentialSvc: helpers.makeCredentialSvcStub()
      }
      $controller('CredentialsCtrl', locals);
    });
  });

  describe('initial state', function() {
    it('should set the scope credentials', function() {
      sinon.assert.called(locals.CredentialSvc.get)
      assert.isNull(locals.$scope.appId)
      assert.isNull(locals.$scope.clientId)
      assert.isNull(locals.$scope.clientSecret)
    });
  });
  describe('load', function() {
    it('should save the scope creds and navigate to the "flows" state', function() {
      locals.$scope.appId = 'someappid'
      locals.$scope.clientId = 'someclientid'
      locals.$scope.clientSecret = 'somesecret'
      locals.$scope.load()
      sinon.assert.calledWithExactly(
        locals.CredentialSvc.set,
        'someappid',
        'someclientid',
        'somesecret'
      )
      sinon.assert.calledWithExactly(
        locals.$state.go,
        'home',
        {},
        { reload: true }
      )
    });
  });
  describe('clear', function() {
    it('should clear the creds and navigate to the auth state', function() {
      locals.$scope.clear()
      sinon.assert.calledWithExactly(locals.CredentialSvc.clear)
      sinon.assert.calledWithExactly(
        locals.$state.go,
        'auth',
        {},
        { reload: true }
      )
    });
  });
  describe('hasCreds', function() {
    it('should return false unless all credentials exist', function() {
      assert.notOk(locals.$scope.hasCreds())
      locals.CredentialSvc.get.returns({ appId: 'someappid', clientId: null, clientSecret: null })
      assert.notOk(locals.$scope.hasCreds())
      locals.CredentialSvc.get.returns({ appId: 'someappid', clientId: 'someclientid', clientSecret: null })
      assert.notOk(locals.$scope.hasCreds())
    });
  });
});
