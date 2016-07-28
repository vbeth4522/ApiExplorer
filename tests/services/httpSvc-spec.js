'use strict';

require('angular-mocks')
var angular = require('angular')

describe('HttpSvc', function() {
  var HttpSvc
  var $httpBackend

  beforeEach(function() {
    angular.mock.module('capi-ui');
    angular.mock.module(function($provide) {
      $provide.value('$state', {})
    });
    angular.mock.inject(function(_HttpSvc_, _$httpBackend_) {
      HttpSvc = _HttpSvc_;
      $httpBackend = _$httpBackend_;
    });
  });
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('get', function() {
    it('should make a GET request', function() {
      var response;
      $httpBackend
        .whenGET('https://v1.api.us.janrain.com/foo')
        .respond(200, 'ok')
      HttpSvc.get('foo')
        .then(function(r) { response = r});
      $httpBackend.flush();
      assert.equal(response.data, 'ok');
    });
  });
  describe('post', function() {
    it('should make a POST request', function() {
      var response;
      $httpBackend
        .whenPOST('https://v1.api.us.janrain.com/foo')
        .respond(200, 'ok')
      HttpSvc.post('foo', {})
        .then(function(r) { response = r});
      $httpBackend.flush();
      assert.equal(response.data, 'ok');
    });
  });
  describe('put', function() {
    it('should make a PUT request', function() {
      var response;
      $httpBackend
        .whenPUT('https://v1.api.us.janrain.com/foo')
        .respond(200, 'ok')
      HttpSvc.put('foo', {})
        .then(function(r) { response = r});
      $httpBackend.flush();
      assert.equal(response.data, 'ok');
    });
  });
  describe('delete', function() {
    it('should make a DELETE request', function() {
      var response;
      $httpBackend
        .whenDELETE('https://v1.api.us.janrain.com/foo')
        .respond(200, 'ok')
      HttpSvc.delete('foo', {})
        .then(function(r) { response = r});
      $httpBackend.flush();
      assert.equal(response.data, 'ok');
    });
  });
  describe('patch', function() {
    it('should make a PATCH request', function() {
      var response;
      $httpBackend
        .whenPATCH('https://v1.api.us.janrain.com/foo')
        .respond(200, 'ok')
      HttpSvc.patch('foo', {})
        .then(function(r) { response = r});
      $httpBackend.flush();
      assert.equal(response.data, 'ok');
    });
  });
});
