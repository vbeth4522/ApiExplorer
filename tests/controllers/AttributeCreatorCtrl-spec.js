'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');
var helpers = require('../helpers')

var schema = "testSchema"
var attributeName = "testAttribute"

describe('AttributeCreatorCtrl', function() {
  var locals;
  var $q;

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller, _$q_) {
      $q = _$q_;
      locals = {
        $scope: $rootScope.$new(),
        $stateParams: {
          schema: schema
        },
        $state: helpers.make$StateStub($q),
        SchemaSvc: helpers.makeSchemaSvcStub($q)
      }
      $controller('AttributeCreatorCtrl', locals)
    });
  });

  describe('initial state', function() {
    it('should initilize the scope', function() {
      assert.deepEqual(locals.$scope.schema, schema);
      assert.deepEqual(locals.$scope.attribute, {});
    });
  });
  describe('create', function() {
    it('should user SchemaSvc to create the Schema Attribute', function() {
      locals.$scope.attribute.name = attributeName;
      locals.$scope.create();
      locals.$scope.$digest();
      sinon.assert.calledWith(locals.SchemaSvc.addAttribute, schema, attributeName, { name: attributeName });
    });
  });
});
