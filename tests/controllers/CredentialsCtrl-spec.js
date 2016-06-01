'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');

describe('CredentialsCtrl', function() {
  var $scope
  var $state
  var CredentialSvc

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller) {
      var emptyCreds = { appId: null, clientId: null, clientSecret: null }
      $scope = $rootScope.$new()
      $state = {
        go: sinon.spy()
      }
      CredentialSvc = {
        clear: sinon.spy(),
        get: sinon.stub().returns(emptyCreds),
        set: sinon.spy()
      }
      $controller(
        'CredentialsCtrl',
        {
          $scope: $scope,
          $state: $state,
          CredentialSvc: CredentialSvc
        }
      )
    });
  });

  describe('initial state', function() {
    it('should set the scope credentials', function() {
      sinon.assert.called(CredentialSvc.get)
      assert.isNull($scope.appId)
      assert.isNull($scope.clientId)
      assert.isNull($scope.clientSecret)
    });
  });
  describe('load', function() {
    it('should save the scope creds and navigate to the "flows" state', function() {
      $scope.appId = 'someappid'
      $scope.clientId = 'someclientid'
      $scope.clientSecret = 'somesecret'
      $scope.load()
      sinon.assert.calledWithExactly(
        CredentialSvc.set,
        'someappid',
        'someclientid',
        'somesecret'
      )
      sinon.assert.calledWithExactly(
        $state.go,
        'flows',
        {},
        { reload: true }
      )
    });
  });
  describe('clear', function() {
    it('should clear the creds and navigate to the auth state', function() {
      $scope.clear()
      sinon.assert.calledWithExactly(CredentialSvc.clear)
      sinon.assert.calledWithExactly(
        $state.go,
        'auth',
        {},
        { reload: true }
      )
    });
  });
  describe('hasCreds', function() {
    it('should return false unless all credentials exist', function() {
      assert.notOk($scope.hasCreds())
      CredentialSvc.get.returns({ appId: 'someappid', clientId: null, clientSecret: null })
      assert.notOk($scope.hasCreds())
      CredentialSvc.get.returns({ appId: 'someappid', clientId: 'someclientid', clientSecret: null })
      assert.notOk($scope.hasCreds())
    });
  });
});
