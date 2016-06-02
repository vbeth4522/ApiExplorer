'use strict';

require('angular-mocks')
var angular = require('angular')
var sinon = require('sinon')

var emptyCreds = { appId: null, clientId: null, clientSecret: null }
var setCreds = { appId: 'foo', clientId: 'bar', clientSecret: 'baz' }

describe('CredentialSvc', function() {
  var CredentialSvc
  var $rootScope

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function(_CredentialSvc_, _$rootScope_) {
      CredentialSvc = _CredentialSvc_
      $rootScope = _$rootScope_
      sinon.spy($rootScope, '$broadcast')
    });
  });
  afterEach(function() {
    $rootScope.$broadcast.restore()
    window.sessionStorage.removeItem('capi-creds')
  });

  describe('get', function() {
    it('should return the credentials', function() {
      var expected = emptyCreds
      assert.deepEqual(CredentialSvc.get(), expected)
    });
  });
  describe('set', function() {
    it('should set the credentials and broadcast an event', function() {
      var expected = setCreds
      CredentialSvc.set('foo', 'bar', 'baz')
      sinon.assert.calledWith($rootScope.$broadcast, 'credentialsUpdated', expected)
      assert.strictEqual(
        window.sessionStorage.getItem('capi-creds'),
        JSON.stringify({ "us": setCreds })
      )
    });
  });
  describe('clear', function() {
    it('should clear the credentials and broadcast an event', function() {
      var expected = emptyCreds
      window.sessionStorage.setItem(
        'capi-creds',
        JSON.stringify(setCreds)
      )
      CredentialSvc.clear()
      sinon.assert.calledWith($rootScope.$broadcast, 'credentialsUpdated', expected)
      assert.strictEqual(window.sessionStorage.getItem('capi-creds'), null)
      assert.deepEqual(CredentialSvc.get(), expected)
    });
  });
});

describe('CredentialSvc with state', function() {
  var CredentialSvc
  var $rootScope

  beforeEach(function() {
    window.sessionStorage.setItem('capi-creds', JSON.stringify({ "us": setCreds }))
    angular.mock.module('capi-ui')
    angular.mock.inject(function(_$rootScope_) {
      $rootScope = _$rootScope_
      sinon.spy($rootScope, '$broadcast')
    });
    angular.mock.inject(function(_CredentialSvc_) {
      CredentialSvc = _CredentialSvc_
    });
  });
  afterEach(function() {
    $rootScope.$broadcast.restore()
    window.sessionStorage.removeItem('capi-creds')
  });

  describe('get', function() {
    it('should broadcast on init and return the credentials', function() {
      var expected = setCreds
      sinon.assert.calledWith($rootScope.$broadcast, 'credentialsUpdated', expected)
      assert.deepEqual(CredentialSvc.get(), expected)
    });
  });
});
