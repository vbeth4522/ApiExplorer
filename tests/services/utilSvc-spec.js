'use strict';

require('angular-mocks')
// var assert = require('assert');
var angular = require('angular');

describe('UtilSvc', function() {
  var UtilSvc

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function(_UtilSvc_) {
      UtilSvc = _UtilSvc_;
    });
  });

  describe('makeAuthHeader', function() {
    it('should return with an auth header.', function() {
      assert.strictEqual(
        UtilSvc.makeAuthHeader({ clientId: 'foo', clientSecret: 'bar' }),
        'Basic Zm9vOmJhcg=='
      )
    });
  });

  describe('urlize', function() {
    it('should join an array of strings into a path.', function() {
      assert.strictEqual(
        UtilSvc.urlize(['foo', 'bar', 'baz', 'qux']),
        'foo/bar/baz/qux'
      )
    });
  });

  describe('unpackTranslations', function() {
    it('should flatten an object structure if there are values', function() {
      var input = {
        foo: 'bar',
        bar: { values: { 'en-US': 'baz' } },
        baz: [
          { bar: 'foo' },
          { foo: { values: { 'en-US': 'bar' } } }
        ]
      }
      var expected = {
        foo: 'bar',
        bar: 'baz',
        baz: [
          { bar: 'foo' },
          { foo: 'bar' }
        ]
      }
      assert.deepEqual(
        UtilSvc.unpackTranslations('en-US', input),
        expected
      )
    });
  })

  describe('scopeHelpers', function() {
    it('should return an object with the expected methods', function() {
      var fns = UtilSvc.scopeHelpers({})
      assert.isFunction(fns.pluckPropToScope)
      assert.isFunction(fns.pluckNameToScope)
      assert.isFunction(fns.grabErrorsAndReject)
      assert.isFunction(fns.assignTo)
    });
  });

});
