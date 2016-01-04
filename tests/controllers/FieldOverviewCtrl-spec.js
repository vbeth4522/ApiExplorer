'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');
var fieldsList = require('../fixtures/fieldCollection')
var fieldDef = require('../fixtures/fieldDefinition')
var schemaAttributes = require('../fixtures/schemaAttributes')
var locales = require('../fixtures/localeCollection')

function stub(returnVal) {
  return sinon.stub().returns(returnVal)
}

describe('FieldOverviewCtrl', function() {
  var $scope
  var $stateParams
  var FieldSvc
  var FieldMetaSvc
  var LocaleSvc
  var SchemaSvc
  var $event

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller, $q, UtilSvc) {
      function apiStub(response) {
        return stub($q.when({ data: response }))
      }
      $scope = $rootScope.$new()
      $stateParams = {
        flow: 'myflow',
        form: 'myform',
        field: 'myfield'
      }
      FieldSvc = {
        get: apiStub(fieldDef),
        getAll: apiStub(fieldsList),
        saveLocalized: apiStub()
      }
      SchemaSvc = {
        get: apiStub(schemaAttributes)
      }
      FieldMetaSvc = {
        getFieldTypeAttributes: apiStub(['foo', 'bar'])
      }
      LocaleSvc = {
        getAll: apiStub(locales)
      }
      $controller(
        'FieldOverviewCtrl',
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
      $event = {
        stopPropagation: sinon.spy(),
        preventDefault: sinon.spy()
      }
    });
  });
  describe('initial state', function() {
    it('should have the correct properties', function() {
      assert.strictEqual($scope.form, $stateParams.form)
      assert.strictEqual($scope.fieldName, $stateParams.field)
      assert.strictEqual($scope.emptyValue, '')
      assert.sameMembers($scope.locales, ['en-US'])
      assert.strictEqual($scope.selectedLocale, 'en-US')
      assert.deepEqual($scope.errors, {})
      assert.sameMembers(
        $scope.validationFormats,
        [
          'alpha',
          'alphaExtended',
          'alphaExtendedSpaces',
          'alphaNumeric',
          'alphaNumericExtended',
          'email',
          'i18nAlphaNumeric',
          'noWhitespace',
          'numeric',
          'numericReal',
          'phone',
          'phoneInternational',
          'zipCode',
          'zipCode+4'
        ]
      )
      assert.deepEqual($scope.newValidation, { rule: '', value: null, message: '' })
      assert.deepEqual($scope.newOption, { label: '', value: '' })
      $scope.$apply()
      assert.deepEqual($scope.field, fieldDef)
      assert.sameMembers($scope.schemaAttributes, ['birthday', 'primaryAddress.mobile'])
      assert.sameMembers($scope.fieldAttributes, ['foo', 'bar'])
      assert.sameMembers($scope.locales, ['en-US', 'it-IT'])
      assert.sameMembers($scope.allFields, ['signInEmailAddress', 'currentPassword'])
    });
  });
  describe('fieldSupports', function() {
    it('should return false if passed a value not in $scope.fieldAttributes', function() {
      assert.isFalse($scope.fieldSupports('no way'))
    });
    it('should return true if passed a value in $scope.fieldAttributes', function() {
      $scope.fieldAttributes = ['some', 'cool', 'attrs']
      assert.isTrue($scope.fieldSupports('cool'))
    });
  });
  describe('getAllowedValidations', function() {
    it('should return the validations not already applied to the field', function() {
      var expected = [
        'blacklist',
        'format',
        'match',
        'unique',
        'whitelist'
      ]
      $scope.field = {
        validation: [
          { rule: 'maxLength' },
          { rule: 'minLength' },
          { rule: 'required' }
        ]
      }
      assert.sameMembers($scope.getAllowedValidations(), expected)
    });
    it('should work even if validations are undefined', function() {
      var expected = [
        'blacklist',
        'format',
        'match',
        'maxLength',
        'minLength',
        'required',
        'unique',
        'whitelist'
      ]
      $scope.field = {}
      assert.sameMembers($scope.getAllowedValidations(), expected)
    });
  });
  describe('save', function() {
    it('should call saveLocalized', function() {
      $scope.save()
      sinon.assert.called(FieldSvc.saveLocalized)
    });
  });
  describe('addOption', function() {
    it('should add a new option to a field and reset the newOption value', function() {
      var expected = {
        options: [
          {
            label: { values: { 'en-US': 'Foo' } },
            value: 'fooval'
          }, {
            label: { _self: null, values: { 'en-US': 'Bar' } },
            value: 'barval'
          }
        ]
      }
      $scope.field = {
        options: [
          {
            label: { values: { 'en-US': 'Foo' } },
            value: 'fooval'
          }
        ]
      }
      $scope.newOption = {
        label: 'Bar',
        value: 'barval'
      }
      $scope.addOption()
      assert.deepEqual($scope.field, expected)
      assert.deepEqual($scope.newOption, { label: '', value: '' })
    });
    it("should add the options prop if it doesn't exist", function() {
      var expected = {
        options: [
          {
            label: { _self: null, values: { 'en-US': 'Bar' } },
            value: 'barval'
          }
        ]
      }
      $scope.field = {}
      $scope.newOption = {
        label: 'Bar',
        value: 'barval'
      }
      $scope.addOption()
      assert.deepEqual($scope.field, expected)
    });
  });
  describe('addValidation', function() {
    it('should add a new validation to a field and reset the newOption value', function() {
      var expected = {
        validation: [
          {
            message: { values: { 'en-US': 'This is required.' } },
            rule: 'required',
            value: true
          }, {
            message: { _self: null, values: { 'en-US': 'Min length of 10.' } },
            rule: 'minLength',
            value: 10
          }
        ]
      }
      $scope.field = {
        validation: [
          {
            message: { values: { 'en-US': 'This is required.' } },
            rule: 'required',
            value: true
          }
        ]
      }
      $scope.newValidation = {
        message: 'Min length of 10.',
        rule: 'minLength',
        value: 10
      }
      $scope.addValidation()
      assert.deepEqual($scope.field, expected)
      assert.deepEqual($scope.newValidation, { rule: '', message: '', value: null })
    });
    it("should add the validation prop if it doesn't exist", function() {
      var expected = {
        validation: [
          {
            message: { _self: null, values: { 'en-US': 'This is required.' } },
            rule: 'required',
            value: true
          }
        ]
      }
      $scope.field = {}
      $scope.newValidation = {
        message: 'This is required.',
        rule: 'required',
        value: true
      }
      $scope.addValidation()
      assert.deepEqual($scope.field, expected)
    });
  });
  describe('removeOption', function() {
    it('should stop all further click event propegation', function() {
      $scope.field = { options: [1, 2, 3, 4] }
      $scope.removeOption(2, $event)
      sinon.assert.called($event.stopPropagation)
      sinon.assert.called($event.preventDefault)
    });
    it('should remove an element from the field options array', function() {
      $scope.field = { options: [1, 2, 3, 4] }
      $scope.removeOption(2, $event)
      assert.sameMembers($scope.field.options, [1, 2, 4])
    });
    it('should delete the options property if the last option is removed', function() {
      $scope.field = { options: [1] }
      $scope.removeOption(0, $event)
      assert.isUndefined($scope.field.options)
    });
  });
  describe('removeValidation', function() {
    it('should stop all further click event propegation', function() {
      $scope.field = { validation: [1, 2, 3, 4] }
      $scope.removeValidation(2, $event)
      sinon.assert.called($event.stopPropagation)
      sinon.assert.called($event.preventDefault)
    });
    it('should remove an element from the field validation array', function() {
      $scope.field = { validation: [1, 2, 3, 4] }
      $scope.removeValidation(2, $event)
      assert.sameMembers($scope.field.validation, [1, 2, 4])
    });
    it('should delete the validation property if the last validation is removed', function() {
      $scope.field = { validation: [1] }
      $scope.removeValidation(0, $event)
      assert.isUndefined($scope.field.validation)
    });
  });
});
