'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');
var helpers = require('../helpers')

var flow = "testFlow"
var version = "testVersion"

describe('MailTemplatesExportCtrl', function() {
  var locals;
  var $q;

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller, _$q_) {
      $q = _$q_;
      var sFn = helpers.makeScopeHelpersStub();
      locals = {
        $scope: $rootScope.$new(),
        $stateParams: {
          flow: flow
        },
        sFn: sFn,
        UtilSvc: helpers.makeUtilSvcStub(sFn),
        MailTemplateSvc: helpers.makeMailTemplateSvcStub($q),
        LocaleSvc: helpers.makeLocaleSvcStub($q),
        ZipSvc: helpers.makeZipSvcStub($q),
        Flow: {
          version: version
        }
      }
      $controller('MailTemplatesExportCtrl', locals)
    });
  });

  describe('initial state', function() {
    it('should initilize the scope', function() {
      sinon.assert.calledOnce(locals.UtilSvc.scopeHelpers);
      sinon.assert.calledOnce(locals.MailTemplateSvc.getAll);
      sinon.assert.calledWith(locals.MailTemplateSvc.getAll, flow);
      sinon.assert.calledOnce(locals.LocaleSvc.getAll);
      sinon.assert.calledWith(locals.LocaleSvc.getAll, flow);
      sinon.assert.calledTwice(locals.sFn.pluckNameToScope);
      sinon.assert.calledWith(locals.sFn.pluckNameToScope, 'locales');
      sinon.assert.calledWith(locals.sFn.pluckNameToScope, 'mailTemplates');
      assert.deepEqual(locals.$scope.locales, []);
      assert.deepEqual(locals.$scope.mailTemplates, []);
      assert.deepEqual(locals.$scope.addableLocales, []);
      assert.deepEqual(locals.$scope.addableMailTemplates, []);
    });
  });
  describe('addMailTemplate', function() {
    it('should do nothing when index is -1', function() {
      var result = locals.$scope.addMailTemplate(-1);
      assert.isUndefined(result);
    });
    it('should add mailTemplate', function() {
      locals.$scope.addableMailTemplates = ['abc']
      var result = locals.$scope.addMailTemplate(0);
      assert.deepEqual(locals.$scope.addableMailTemplates, []);
      assert.deepEqual(locals.$scope.mailTemplates, ['abc']);
    });
  });
  describe('removeMailTemplate', function() {
    it('should do nothing when index is -1', function() {
      var result = locals.$scope.removeMailTemplate(-1);
      assert.isUndefined(result);
    });
    it('should remove mailTemplate', function() {
      locals.$scope.mailTemplates = ['abc']
      var result = locals.$scope.removeMailTemplate(0);
      assert.deepEqual(locals.$scope.mailTemplates, []);
      assert.deepEqual(locals.$scope.addableMailTemplates, ['abc']);
    });
  });
  describe('addLocale', function() {
    it('should do nothing when index is -1', function() {
      var result = locals.$scope.addLocale(-1);
      assert.isUndefined(result);
    });
    it('should add locale', function() {
      locals.$scope.addableLocales = ['abc']
      var result = locals.$scope.addLocale(0);
      assert.deepEqual(locals.$scope.addableLocales, []);
      assert.deepEqual(locals.$scope.locales, ['abc']);
    });
  });
  describe('removeLocale', function() {
    it('should do nothing when index is -1', function() {
      var result = locals.$scope.removeLocale(-1);
      assert.isUndefined(result);
    });
    it('should remove mailTemplate', function() {
      locals.$scope.locales = ['abc']
      var result = locals.$scope.removeLocale(0);
      assert.deepEqual(locals.$scope.locales, []);
      assert.deepEqual(locals.$scope.addableLocales, ['abc']);
    });
  });
  describe('export', function() {
    it('should do nothing when there are no mail templates', function() {
      var result = locals.$scope.export();
      sinon.assert.notCalled(locals.MailTemplateSvc.get)
      sinon.assert.notCalled(locals.ZipSvc.zipMailTemplates)
      sinon.assert.notCalled(locals.ZipSvc.dump)
    });
    it('should do export when there are templates', function() {
      locals.$scope.locales = ["en-US"];
      locals.$scope.mailTemplates = ["mt1", "mt2"];
      locals.$scope.export();
      sinon.assert.calledWith(locals.MailTemplateSvc.get, flow, locals.$scope.locales[0], locals.$scope.mailTemplates[0])
      sinon.assert.calledWith(locals.MailTemplateSvc.get, flow, locals.$scope.locales[0], locals.$scope.mailTemplates[1])
    });
  });
});
