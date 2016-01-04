'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');
var h = require('../helpers')
var flowOverview = require('../fixtures/flowOverview')

describe('FlowOverviewCtrl', function() {
  var $scope
  var $stateParams
  var FieldSvc
  var FlowSvc
  var FormSvc
  var LocaleSvc
  var MailTemplateSvc

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller, $q) {
      $scope = $rootScope.$new()
      $stateParams = {
        flow: 'myflow'
      }
      FieldSvc = h.makeFieldSvcStub($q)
      FlowSvc = h.makeFlowSvcStub($q)
      FormSvc = h.makeFormSvcStub($q)
      LocaleSvc = h.makeLocaleSvcStub($q)
      MailTemplateSvc = h.makeMailTemplateSvcStub($q)
      $controller(
        'FlowOverviewCtrl',
        {
          $scope: $scope,
          $stateParams: $stateParams,
          FieldSvc: FieldSvc,
          FlowSvc: FlowSvc,
          FormSvc: FormSvc,
          LocaleSvc: LocaleSvc,
          MailTemplateSvc: MailTemplateSvc
        }
      );
    });
  });

  describe('initial state', function() {
    it('should get a bunch of information about the flow', function() {
      sinon.assert.calledWithExactly(FieldSvc.getAll, 'myflow')
      sinon.assert.calledWithExactly(FlowSvc.get, 'myflow')
      sinon.assert.calledWithExactly(FormSvc.getAll, 'myflow')
      sinon.assert.calledWithExactly(LocaleSvc.getAll, 'myflow')
      sinon.assert.calledWithExactly(MailTemplateSvc.getAll, 'myflow')
    });
    it('should assign flow info to the scope', function() {
      $scope.$apply();
      assert.deepEqual($scope.flow, flowOverview)
      assert.sameMembers(
        $scope.flowFields,
        ['signInEmailAddress', 'currentPassword']
      )
      assert.sameMembers(
        $scope.flowForms,
        ['signInForm', 'editProfileForm']
      )
      assert.sameMembers(
        $scope.mailTemplates,
        [
          'reactivateAccount',
          'passwordRecover',
          'registrationVerification',
          'emailAddressChanged'
        ]
      )
      assert.sameMembers(
        $scope.flowLocales,
        [
          'en-US',
          'it-IT'
        ]
      )
    });
  });
});
