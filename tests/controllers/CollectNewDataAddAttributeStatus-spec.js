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
        $scope: $rootScope.$new(),
        $stateParams: {
          flow: "flow_of_awesome",
          attribute: { name: "my-cool-attribute", type: "string" },
          results: [
            {
              status: 200,
              data: {
                errors: "This is an error message",
                success: "This is a success!"
              }
            },
            {
              status: 400,
              data: {
                errors: "This is an error message",
                success: "This is a success!"
              }
            },
            {
              status: 200,
              data: {
                errors: "This is an error message",
                success: "This is a success!"
              }
            },
          ]
        },
        $state: helpers.make$StateStub($q)
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
      sinon.assert.calledWith(locals.$state.go, 'collectNewData.addAttribute', { flow: locals.$stateParams.flow });
    });
  });
  describe('continue', function() {
    it('should redirect to the field creator', function() {
      locals.$scope.continue();
      locals.$scope.$digest();
      sinon.assert.calledWith(locals.$state.go, 'collectNewData.addField', { flow: locals.$stateParams.flow, attribute: locals.$stateParams.attribute });
    });
  });
});
