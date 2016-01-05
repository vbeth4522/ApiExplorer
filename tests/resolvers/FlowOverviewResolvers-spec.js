'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');
var h = require('../helpers')
var flowOverview = require('../fixtures/flowOverview')
var flowOverviewResolvers = require('../../src/resolvers/FlowOverviewResolvers')

describe('FlowOverviewResolvers', function() {
  var $stateParams
  var FieldSvc
  var FlowSvc
  var FormSvc
  var LocaleSvc
  var MailTemplateSvc

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($q) {
      $stateParams = {
        flow: 'myflow'
      }
      FieldSvc = h.makeFieldSvcStub($q)
      FlowSvc = h.makeFlowSvcStub($q)
      FormSvc = h.makeFormSvcStub($q)
      LocaleSvc = h.makeLocaleSvcStub($q)
      MailTemplateSvc = h.makeMailTemplateSvcStub($q)
    });
  });
  describe('Flow', function() {
    it('should get the flow info', function() {
      flowOverviewResolvers.Flow($stateParams, FlowSvc)
      sinon.assert.calledWithExactly(FlowSvc.get, 'myflow')
    });
  });
  describe('Fields', function() {
    it('should get all of the fields in the flow', function() {
      flowOverviewResolvers.Fields($stateParams, FieldSvc)
      sinon.assert.calledWithExactly(FieldSvc.getAll, 'myflow')
    });
  });
  describe('Forms', function() {
    it('should get all of the fields in the flow', function() {
      flowOverviewResolvers.Forms($stateParams, FormSvc)
      sinon.assert.calledWithExactly(FormSvc.getAll, 'myflow')
    });
  });
  describe('Locales', function() {
    it('should get all of the fields in the flow', function() {
      flowOverviewResolvers.Locales($stateParams, LocaleSvc)
      sinon.assert.calledWithExactly(LocaleSvc.getAll, 'myflow')
    });
  });
  describe('MailTemplates', function() {
    it('should get all of the fields in the flow', function() {
      flowOverviewResolvers.MailTemplates($stateParams, MailTemplateSvc)
      sinon.assert.calledWithExactly(MailTemplateSvc.getAll, 'myflow')
    });
  });
});
