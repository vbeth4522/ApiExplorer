'use strict';

require('angular-mocks');
var angular = require('angular');
var sinon = require('sinon');
var fieldsList = require('./fixtures/fieldCollection');
var fieldDef = require('./fixtures/fieldDefinition');
var flowOverview = require('./fixtures/flowOverview');
var formsList = require('./fixtures/formCollection');
var mailTemplatesList = require('./fixtures/mailTemplateCollection');
var localesList = require('./fixtures/localeCollection');
var schemaAttributes = require('./fixtures/schemaAttributes');
var emptyCreds = require('./fixtures/credsEmpty');
var defaultRegion = require('./fixtures/defaultRegion');
var defaultRegionUrl = require('./fixtures/defaultRegionUrl');
var regions = require('./fixtures/regions');

var restorer = exports.restorer = function(object, methods) {
  methods.forEach(function(method) {
    object[method].restore();
  });
}

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

exports.makeHttpSvcStub = function($q, HttpSvc) {
  if(!HttpSvc) {
    return {
      get: apiStub($q),
      delete: apiStub($q),
      post: apiStub($q),
      put: apiStub($q),
      patch: apiStub($q),
      serialGet: apiStub($q),
      serialDelete: apiStub($q),
      serialPost: apiStub($q),
      serialPut: apiStub($q),
      serialPatch: apiStub($q)
    };
  }
  sinon.stub(HttpSvc, 'get');
  sinon.stub(HttpSvc, 'delete');
  sinon.stub(HttpSvc, 'post');
  sinon.stub(HttpSvc, 'put');
  sinon.stub(HttpSvc, 'patch');
  sinon.stub(HttpSvc, 'serialGet');
  sinon.stub(HttpSvc, 'serialDelete');
  sinon.stub(HttpSvc, 'serialPost');
  sinon.stub(HttpSvc, 'serialPut');
  sinon.stub(HttpSvc, 'serialPatch');
  return HttpSvc;
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
    getAllIntersect: apiStub($q, schemaAttributes),
    getAttribute: apiStub($q),
    addAttribute: apiStub($q),
    deleteAttribute: apiStub($q)
  }
}

exports.makeCredentialSvcStub = function(CredentialSvc) {
  if(!CredentialSvc) {
    return {
      clear: stub(),
      get: stub(emptyCreds),
      set: stub(),
      hasAnyCreds: stub(false)
    };
  }
  sinon.stub(CredentialSvc, 'clear');
  sinon.stub(CredentialSvc, 'get').returns(emptyCreds);
  sinon.stub(CredentialSvc, 'set');
  sinon.stub(CredentialSvc, 'hasAnyCreds').returns(false);
  return CredentialSvc;
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

exports.makeNotificationsSvcStub = function() {
  return {
    get: stub(),
    add: stub(),
    remove: stub()
  }
}

exports.make$StateStub = function() {
  return {
    go: stub()
  }
}

exports.restoreCredentialSvc = function(CredentialSvc) {
  restorer(CredentialSvc, [
    "clear",
    "get",
    "set"
  ]);
}

exports.restoreHttpSvc = function(HttpSvc) {
  restorer(HttpSvc, [
    "get",
    "delete",
    "post",
    "put",
    "patch",
    "serialGet",
    "serialDelete",
    "serialPost",
    "serialPut",
    "serialPatch"
  ]);
}
