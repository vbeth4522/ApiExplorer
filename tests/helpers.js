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
var emptyCreds = require('./fixtures/emptyCreds')
var defaultRegion = require('./fixtures/defaultRegion')
var defaultRegionUrl = require('./fixtures/defaultRegionUrl')
var regions = require('./fixtures/regions')
// var $q

// function gimmeQ() {
//   if (!$q) angular.mock.inject(function(_$q_) { $q = _$q_ });
//   return $q
// }

var apiStub = exports.apiStub = function($q, response) {
  return sinon.stub().returns(($q.when({ data: response })))
}

var stub = exports.stub = function(returnVal) {
  return sinon.stub().returns(returnVal)
}

exports.makeFieldSvcStub = function($q) {
  return {
    get: apiStub($q, fieldDef),
    getAll: apiStub($q, fieldsList),
    saveLocalized: apiStub($q),
    addLocalized: apiStub($q)
  }
}

exports.makeFieldMetaSvcStub = function($q) {
  return {
    getFieldTypes: apiStub($q, [{ name: 'foo'}, { name: 'bar' }]),
    getFieldTypeAttributes: apiStub($q, ['foo', 'bar'])
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
    get: apiStub($q),
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
    clear: apiStub($q),
    get: apiStub($q, schemaAttributes),
    set: apiStub($q),
    getAttribute: apiStub($q),
    deleteAttribute: apiStub($q)
  }
}

exports.makeCredentialSvcStub = function() {
  return {
    clear: stub(),
    get: stub(emptyCreds),
    set: stub()
  }
}

exports.makeUtilSvcStub = function(sFn) {
  return {
    scopeHelpers: stub(sFn)
  }
}

exports.makeScopeHelpersStub = function() {
  return {
    pluckNameToScope: stub()
  }
}

exports.makeZipSvcStub = function($q) {
  return {
    zipMailTemplates: apiStub($q),
    unzipMailTemplates: apiStub($q),
    dump: stub($q)
  }
}

exports.makeFileReaderSvcStub = function($q) {
  return {
    readAsArrayBuffer: apiStub($q)
  }
}

exports.makeRegionSvcStub = function() {
  return {
    get: stub(defaultRegion),
    url: stub(defaultRegionUrl),
    regions: stub(regions),
    set: stub()
  }
}

exports.make$StateStub = function() {
  return {
    go: stub()
  }
}
