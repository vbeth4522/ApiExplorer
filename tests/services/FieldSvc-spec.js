'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');
var fieldsList = require('../fixtures/fieldCollection')
var fieldDef = require('../fixtures/fieldDefinition')

describe('FieldSvc', function() {
  var FieldSvc
  var $httpBackend
  var baseUrl = 'https://v1.api.janrain.us/config/myappid/flows/myflow'
  var fieldsUrl = baseUrl + '/fields'
  var fieldUrl = fieldsUrl + '/myfield'
  var localizedAddUrl = baseUrl + '/locales/en-US/fields'
  var localizedSaveUrl = localizedAddUrl + '/myfield'

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.module(function($provide) {
      var CredentialSvc = {
        get: function() {
          return { appId: 'myappid', clientId: 'bar', clientSecret: 'baz' }
        }
      }
      $provide.value('CredentialSvc', CredentialSvc)
    });
    angular.mock.inject(function(_FieldSvc_, _$httpBackend_) {
      FieldSvc = _FieldSvc_
      $httpBackend = _$httpBackend_

      $httpBackend
        .whenGET(fieldsUrl)
        .respond(200, fieldsList)
      $httpBackend
        .whenGET(fieldUrl)
        .respond(200, fieldDef)
      $httpBackend
        .whenPUT(localizedSaveUrl)
        .respond(204)
      $httpBackend
        .whenPOST(localizedAddUrl)
        .respond(204)
    });
  });
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('getAll', function() {
    it('should return a list of all fields', function() {
      var result
      $httpBackend.expectGET(fieldsUrl)
      FieldSvc
        .getAll('myflow')
        .then(function(resp) {
          result = resp
        });
      $httpBackend.flush();
      assert.sameDeepMembers(result.data, fieldsList)
    });
  });
  describe('get', function() {
    it('should return a single field definition', function() {
      var result
      $httpBackend.expectGET(fieldUrl)
      FieldSvc
        .get('myflow', 'myfield')
        .then(function(resp) {
          result = resp
        });
      $httpBackend.flush();
      assert.deepEqual(result.data, fieldDef)
    });
  });
  describe('saveLocalized', function() {
    it('should PUT to the localized field endpoint', function() {
      var fieldDef = {foo: 'bar'}
      $httpBackend.expectPUT(localizedSaveUrl, fieldDef)
      FieldSvc.saveLocalized('myflow', 'en-US', 'myfield', fieldDef)
      $httpBackend.flush();
    });
  });
  describe('addLocalized', function() {
    it('should PUT to the localized field endpoint', function() {
      var fieldDef = {foo: 'bar'}
      $httpBackend.expectPOST(localizedAddUrl, fieldDef)
      FieldSvc.addLocalized('myflow', 'en-US', fieldDef)
      $httpBackend.flush();
    });
  });
});
