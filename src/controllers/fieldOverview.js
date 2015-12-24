'use strict';
var pluck = require('lodash/collection/pluck');
var map = require('lodash/collection/map');
var includes = require('lodash/collection/includes');
var assign = require('lodash/object/assign');
var isObject = require('lodash/lang/isObject');
var isArray = require('lodash/lang/isArray');
var forOwn = require('lodash/object/forOwn');
var has = require('lodash/object/has');
var partial = require('lodash/function/partial');
var first = require('lodash/array/first');
var isEmpty = require('lodash/lang/isEmpty');
var difference = require('lodash/array/difference');

// Would be neat to be able to request these values from the API.
var validationFormats = [
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

var validations = [
  'blacklist',
  'format',
  'match',
  'maxLength',
  'minLength',
  'required',
  'unique',
  'whitelist'
]

function isReference(item) {
  return has(item, '_self');
}

function unpackTranslations(locale, field) {
  var copy = assign({}, field);
  forOwn(copy, function(v, k) {
    if (isObject(v) && isReference(v)) {
      copy[k] = v.values[locale];
    }
    if (isArray(v)) {
      copy[k] = map(v, partial(unpackTranslations, locale))
    }
  });
  return copy;
}

function getSelectedOption(field) {
  if (!field.options) return;
  var i = 0;
  for (; i < field.options.length; i++) {
    if (field.options[i].selected) return field.options[i].value
  }
}

module.exports = function($scope, $stateParams, UtilSvc, FieldSvc, FieldMetaSvc, LocaleSvc, SchemaSvc) {
  var sFn = UtilSvc.scopeHelpers($scope)
  var flow = $stateParams.flow
  var field = $stateParams.field

  function addOptionOrValidation(scopeProp, translatableProp, fieldProp, newItem) {
    var newThing = assign({}, $scope[scopeProp]);
    newThing[translatableProp] = {
      _self: null,
      values: {}
    };
    newThing[translatableProp].values[$scope.selectedLocale] = $scope[scopeProp][translatableProp];
    if (!$scope.field[fieldProp]) {
      $scope.field[fieldProp] = []
    }
    $scope.field[fieldProp].push(newThing)
    $scope[scopeProp] = newItem
    console.log($scope)
  }

  function removeOptionOrValidation(fieldProp, $index, $event) {
    // This is so that the close button doesn't close the accordion/activate the
    // a tag.
    $event.stopPropagation();
    $event.preventDefault();
    $scope.field[fieldProp].splice($index, 1);
    if (isEmpty($scope.field[fieldProp])) {
      delete $scope.field[fieldProp];
    }
  }

  $scope.emptyValue = ""
  $scope.locales = ['en-US']
  $scope.selectedLocale = first($scope.locales)
  $scope.errors = {}
  $scope.validationFormats = validationFormats
  // $scope.validations = validations
  $scope.newValidation = { rule: '', value: null, message: '' }
  $scope.newOption = { label: '', value: '' }
  // This will have to get more sophisticated once we know what schemas the flow
  // is compatible with.
  SchemaSvc
    .get('user')
    .then(sFn.pluckPropToScope('schemaAttribute', 'schemaAttributes'))
  LocaleSvc
    .getAll(flow)
    .then(sFn.pluckNameToScope('locales'));
  FieldSvc
    .getAll(flow)
    .then(sFn.pluckNameToScope('allFields'));
  FieldSvc
    .get(flow, field)
    .then(function(resp) {
      $scope.field = resp.data
      // Needs to be an object because of Angular :P
      $scope.selectedOption = {
        value: getSelectedOption($scope.field)
      }
      return $scope.field.type
    })
    .then(FieldMetaSvc.getFieldTypeAttributes)
    .then(function(resp) {
      $scope.fieldAttributes = resp.data
    });

  $scope.fieldSupports = function(attr) {
    return includes($scope.fieldAttributes, attr)
  }

  $scope.save = function() {
    $scope.errors = {};
    return FieldSvc
      .saveLocalized(
        flow,
        $scope.selectedLocale,
        field,
        unpackTranslations($scope.selectedLocale, $scope.field))
      .catch(sFn.grabErrorsAndReject)
  }

  $scope.getAllowedValidations = function() {
    if (!$scope.field) return
    return difference(validations, pluck($scope.field.validation || [], 'rule'))
  }

  $scope.addOption = partial(
    addOptionOrValidation,
    'newOption',
    'label',
    'options',
    { label: '', value: '' }
  )

  $scope.addValidation = partial(
    addOptionOrValidation,
    'newValidation',
    'message',
    'validation',
    { rule: '', value: null, message: ''}
  )

  $scope.removeOption = partial(removeOptionOrValidation, 'options')
  $scope.removeValidation = partial(removeOptionOrValidation, 'validation')
}
