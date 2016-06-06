'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');

var flow = "testFlow"

describe('MailTemplatesExportCtrl', function() {
  var MailTemplatesExportCtrl;
  var $scope;
  var $stateParams;
  var $q;
  var sFn;
  var UtilSvc;
  var MailTemplateSvc;
  var LocaleSvc;
  var ZipSvc;

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller, _$q_) {
      $q = _$q_ ;
      $scope = $rootScope.$new()
      $stateParams = {
        flow: flow
      }
      sFn = {
        pluckNameToScope: sinon.stub().returns()
      }
      UtilSvc = {
        scopeHelpers: sinon.stub().returns(sFn)
      }
      MailTemplateSvc = {
        get: sinon.stub().returns($q.when([])),
        getAll: sinon.stub().returns($q.when([]))
      }
      LocaleSvc = {
        getAll: sinon.stub().returns($q.when([]))
      }
      ZipSvc = {
        zipMailTemplates: sinon.stub().returns($q.when({})),
        dump: sinon.stub().returns($q.when({}))
      }
      $controller(
        'MailTemplatesExportCtrl',
        {
          $scope: $scope,
          $stateParams: $stateParams,
          UtilSvc: UtilSvc,
          MailTemplateSvc: MailTemplateSvc,
          LocaleSvc: LocaleSvc,
          ZipSvc: ZipSvc
        }
      )
    });
  });

  describe('initial state', function() {
    it('should initilize the scope', function() {
      sinon.assert.calledOnce(UtilSvc.scopeHelpers);
      sinon.assert.calledOnce(MailTemplateSvc.getAll);
      sinon.assert.calledWith(MailTemplateSvc.getAll, flow);
      sinon.assert.calledOnce(LocaleSvc.getAll);
      sinon.assert.calledWith(LocaleSvc.getAll, flow);
      sinon.assert.calledTwice(sFn.pluckNameToScope);
      sinon.assert.calledWith(sFn.pluckNameToScope, 'locales');
      sinon.assert.calledWith(sFn.pluckNameToScope, 'mailTemplates');
      assert.deepEqual($scope.locales, []);
      assert.deepEqual($scope.mailTemplates, []);
      assert.deepEqual($scope.addableLocales, []);
      assert.deepEqual($scope.addableMailTemplates, []);
    });
  });
  describe('addMailTemplate', function() {
    it('should do nothing when index is -1', function() {
      var result = $scope.addMailTemplate(-1);
      assert.isUndefined(result);
    });
    it('should add mailTemplate', function() {
      $scope.addableMailTemplates = ['abc']
      var result = $scope.addMailTemplate(0);
      assert.deepEqual($scope.addableMailTemplates, []);
      assert.deepEqual($scope.mailTemplates, ['abc']);
    });
  });
  describe('removeMailTemplate', function() {
    it('should do nothing when index is -1', function() {
      var result = $scope.removeMailTemplate(-1);
      assert.isUndefined(result);
    });
    it('should remove mailTemplate', function() {
      $scope.mailTemplates = ['abc']
      var result = $scope.removeMailTemplate(0);
      assert.deepEqual($scope.mailTemplates, []);
      assert.deepEqual($scope.addableMailTemplates, ['abc']);
    });
  });
  describe('addLocale', function() {
    it('should do nothing when index is -1', function() {
      var result = $scope.addLocale(-1);
      assert.isUndefined(result);
    });
    it('should add locale', function() {
      $scope.addableLocales = ['abc']
      var result = $scope.addLocale(0);
      assert.deepEqual($scope.addableLocales, []);
      assert.deepEqual($scope.locales, ['abc']);
    });
  });
  describe('removeLocale', function() {
    it('should do nothing when index is -1', function() {
      var result = $scope.removeLocale(-1);
      assert.isUndefined(result);
    });
    it('should remove mailTemplate', function() {
      $scope.locales = ['abc']
      var result = $scope.removeLocale(0);
      assert.deepEqual($scope.locales, []);
      assert.deepEqual($scope.addableLocales, ['abc']);
    });
  });
  describe('export', function() {
    it('should do nothing when there are no mail templates', function() {
      var result = $scope.export();
      sinon.assert.notCalled(MailTemplateSvc.get)
      sinon.assert.notCalled(ZipSvc.zipMailTemplates)
      sinon.assert.notCalled(ZipSvc.dump)
    });
    it('should do export when there are templates', function() {
      $scope.locales = ["en-US"];
      $scope.mailTemplates = ["mt1", "mt2"];
      MailTemplateSvc.get.returns($q.when({ data: {} }))
      $scope.export();
      sinon.assert.calledWith(MailTemplateSvc.get, flow, $scope.locales[0], $scope.mailTemplates[0])
      sinon.assert.calledWith(MailTemplateSvc.get, flow, $scope.locales[0], $scope.mailTemplates[1])
    });
  });
});
