'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');
var helpers = require('../helpers');

describe('CollectNewDataAddAttributeStatus', function() {
  var locals

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller, $q) {
      locals = {
        $q: $q,
        $scope: $rootScope.$new(),
        $stateParams: {
          flow: "flow_of_awesome",
          attribute: { name: "my-cool-attribute", type: "string" },
          results: [
            {
              status: 204,
              data: {
                success: "This is a success!"
              }
            },
            {
              status: 400,
              data: {
                errors: "This is an error message",
              }
            },
            {
              status: 204,
              data: {
                success: "This is a success!"
              }
            },
          ],
          schemas: ["schema1", "schema2", "schema3"],
        },
        $state: helpers.make$StateStub($q),
        SchemaSvc: helpers.makeSchemaSvcStub($q),
        UtilSvc: helpers.makeUtilSvcStub($q)
      }
      $controller('CollectNewDataAddAttributeStatusCtrl', locals);
    });
  });

  describe('initial state', function() {
    it('should get a report about the attribute in each schema', function() {
      assert.isArray(locals.$scope.report, "report is not an array!");
      assert.lengthOf(locals.$scope.report, locals.$stateParams.results.length, "We got more/less reports than we expected!");
    });
  });
  describe('back', function() {
    it('should redirect back to the attribute creator', function() {
      locals.$scope.back();
      locals.$scope.$digest();
      sinon.assert.calledWith(locals.$state.go, 'collectNewData.addAttribute', { flow: locals.$stateParams.flow, schemas: locals.$stateParams.schemas });
    });
  });
  describe('continue', function() {
    it('should redirect to the field creator', function() {
      locals.$scope.continue();
      locals.$scope.$digest();
      sinon.assert.calledWith(locals.$state.go, 'collectNewData.addField', { flow: locals.$stateParams.flow, attribute: locals.$stateParams.attribute });
    });
  });
  describe('retry', function() {
    it('should redirect to itself after trying to add the attribute again', function() {
      for(var i = 0; i < locals.$stateParams.results.length; i++) {
        locals.SchemaSvc.addAttribute.onCall(i).returns(locals.$q.when(locals.$stateParams.results[i]));
      }
      locals.$scope.retry();
      locals.$scope.$digest();
      sinon.assert.callCount(locals.SchemaSvc.addAttribute, locals.$stateParams.schemas.length);
      for(var i = 0; i < locals.$stateParams.results.length; i++) {
        sinon.assert.calledWith(locals.SchemaSvc.addAttribute, locals.$stateParams.schemas[i]);
      }
      sinon.assert.calledWith(locals.$state.go, 'collectNewData.addAttributeStatus', locals.$stateParams);
    });
  });
});
