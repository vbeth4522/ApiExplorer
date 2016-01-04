'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');
var fieldsList = require('./fixtures/fieldCollection')
var fieldDef = require('./fixtures/fieldDefinition')
var flowOverview = require('./fixtures/flowOverview')
var formsList = require('./fixtures/formCollection')
var mailTemplatesList = require('./fixtures/mailTemplateCollection')
var localesList = require('./fixtures/localeCollection')
var schemaAttributes = require('./fixtures/schemaAttributes')
// var $q

// function gimmeQ() {
//   if (!$q) angular.mock.inject(function(_$q_) { $q = _$q_ });
//   return $q
// }

function apiStub($q, response) {
  return sinon.stub().returns(($q.when({ data: response })))
}

exports.makeFieldSvcStub = function($q) {
  return {
    get: apiStub($q, fieldDef),
    getAll: apiStub($q, fieldsList),
    saveLocalized: apiStub($q)
  }
}

exports.makeFlowSvcStub = function($q) {
  return {
    get: apiStub($q, flowOverview)
  }
}

exports.makeFormSvcStub = function($q) {
  return {
    getAll: apiStub($q, formsList)
  }
}

exports.makeMailTemplateSvcStub = function($q) {
  return {
    getAll: apiStub($q, mailTemplatesList)
  }
}

exports.makeLocaleSvcStub = function($q) {
  return {
    getAll: apiStub($q, localesList)
  }
}

exports.makeSchemaSvcStub = function($q) {
  return {
    get: apiStub($q, schemaAttributes)
  }
}
