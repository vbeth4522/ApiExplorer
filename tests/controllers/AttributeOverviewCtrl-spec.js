'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');
var helpers = require('../helpers');

var schema = "my-cool-schema"
var attribute = "my-cool-attribute"
var type = "string"

describe('AttributeOverviewCtrl', function() {
  var locals

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller, $q) {
      locals = {
        $scope: $rootScope.$new(),
        $stateParams: {
          schema: schema,
          attribute: attribute
        },
        Attribute: { name: attribute, type: type },
        SchemaSvc: helpers.makeSchemaSvcStub($q)
      }
      $controller('AttributeOverviewCtrl', locals);
    });
  });

  describe('initial state', function() {
    it('should get a bunch of information about the schema attribute', function() {
      assert.strictEqual(locals.$scope.schema, locals.$stateParams.schema)
      assert.strictEqual(locals.$scope.attribute, locals.$stateParams.attribute)
    });
  });
  describe('delete', function() {
    it('should call SchemaSvc.deleteAttribute', function() {
      locals.$scope.delete();
      sinon.assert.calledWith(locals.SchemaSvc.deleteAttribute, locals.$scope.schema, locals.$scope.attribute);
    });
  });
});
