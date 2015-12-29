'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');

function stub(returnVal) {
  return sinon.stub().returns(returnVal)
}

describe('AddFieldCtrl', function() {
  var $scope
  var $q
  var FieldSvc
  var FieldMetaSvc
  var LocaleSvc
  var SchemaSvc

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller, _$q_, UtilSvc) {
      $q = _$q_
      $scope = $rootScope.$new()
      var $stateParams = {
        flow: 'myflow'
      }
      FieldSvc = {
        addLocalized: stub($q.when())
      }
      FieldMetaSvc = {
        getFieldTypes: stub($q.when({ data: [{ name: 'foo'}, { name: 'bar' }] })),
        getFieldTypeAttributes: stub($q.when({ data: ['foo', 'bar'] }))
      }
      LocaleSvc = {
        getAll: stub($q.when({ data: [{ name: 'baz' }, { name: 'qux' }] }))
      }
      SchemaSvc = {
        get: stub($q.when({ data: [{ schemaAttribute: 'foo' }] }))
      }

      $controller(
        'AddFieldCtrl',
        {
          $scope: $scope,
          $stateParams: $stateParams,
          UtilSvc: UtilSvc,
          FieldSvc: FieldSvc,
          FieldMetaSvc: FieldMetaSvc,
          LocaleSvc: LocaleSvc,
          SchemaSvc: SchemaSvc
        }
      )
    });
  });
  describe('initial state', function() {
    it('should have the expected properties', function() {
      assert.sameMembers($scope.locales, [ 'en-US' ])
      assert.strictEqual($scope.selectedLocale, 'en-US')
      assert.isTrue($scope.adding)
      assert.deepEqual($scope.field, { type: 'text' })
      $scope.$apply()
      assert.sameMembers($scope.schemaAttributes, ['foo'])
      assert.sameMembers($scope.fieldTypes, ['foo', 'bar'])
      assert.sameMembers($scope.locales, ['baz', 'qux'])
      assert.sameMembers($scope.fieldAttributes, ['foo', 'bar'])
    });
  });
  describe('fieldSupports', function() {
    it('should return false if passed "validation"', function() {
      assert.isFalse($scope.fieldSupports('validation'))
    });
    it('should return true if passed a value in $scope.fieldAttributes', function() {
      $scope.fieldAttributes = ['some', 'cool', 'attrs']
      assert.isTrue($scope.fieldSupports('cool'))
    });
  });
  describe('save', function() {
    it('should reset any errors on $scope', function() {
      $scope.errors = { foo: 'bar' }
      $scope.save()
      assert.deepEqual($scope.errors, {})
    });
    it('should save the field', function() {
      $scope.save()
      $scope.$apply()
      sinon.assert.calledWith(FieldSvc.addLocalized, 'myflow', 'en-US', { type: 'text' })
    });
    it('should set errors on the scope if something bad happens', function() {
      FieldSvc.addLocalized.returns($q.reject({ data: { errors: 'oh no!' } }))
      $scope.save()
      $scope.$apply()
      assert.strictEqual($scope.errors, 'oh no!')
    });
  });
});
