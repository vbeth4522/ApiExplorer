'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');

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
      var sFn = UtilSvc.scopeHelpers({})
      assert.isFunction(sFn.pluckPropToScope)
      assert.isFunction(sFn.pluckNameToScope)
      assert.isFunction(sFn.grabErrorsAndReject)
      assert.isFunction(sFn.assignTo)
    });
    describe('pluckPropToScope', function() {
      it('should return a function to pluck from a list response and assign to the scope', function() {
        var scope = {}
        var response = {
          data: [
            { foo: 'foo' },
            { foo: 'bar' },
            { foo: 'baz' },
          ]
        }
        var expected = {
          bar: ['foo', 'bar', 'baz']
        }
        var sFn = UtilSvc.scopeHelpers(scope)
        sFn.pluckPropToScope('foo', 'bar')(response)
        assert.deepEqual(scope, expected)
      });
    });
    describe('grabErrorsAndReject', function() {
      var $q, $rootScope

      beforeEach(function() {
        angular.mock.inject(function(_$q_, _$rootScope_) {
          $q = _$q_
          $rootScope = _$rootScope_
          sinon.spy($q, 'reject')
        });
      });
      afterEach(function() {
        $q.reject.restore()
      });

      it('should assign errors from response to scope and reject', function() {
        var scope = {}
        var response = {
          data: {
            errors: 'Oh no!'
          }
        }
        var expected;
        var sFn = UtilSvc.scopeHelpers(scope)
        sFn.grabErrorsAndReject(response).catch(function(resp) {
          expected = resp
        });
        $rootScope.$apply()
        assert.deepEqual(response, expected)
        assert.strictEqual(scope.errors, response.data.errors)
      });
    });
    describe('assignTo', function() {
      it('should return a function that assigns to scope', function() {
        var scope = {}
        var data = 'this is a value'
        var sFn = UtilSvc.scopeHelpers(scope)
        sFn.assignTo('foo')(data)
        assert.strictEqual(scope.foo, data)
      });
    });
  });

});
