'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');

describe('AttributeCreatorFormCtrl', function() {
  var locals;

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller) {
      var $scope = $rootScope.$new();
      $scope.model = {}
      locals = {
        $scope: $scope
      }
      $controller('AttributeCreatorFormCtrl', locals)
    });
  });

  describe('initial state', function() {
    it('should initilize the scope', function() {
      assert.lengthOf(locals.$scope.addableConstraints, 7);
      assert.lengthOf(locals.$scope.addableFeatures, 2);
    });
  });
  describe('addConstraint', function() {
    it('should do nothing when index is -1', function() {
      var result = locals.$scope.addConstraint(-1);
      assert.isUndefined(result);
    });
    it('should add constraint', function() {
      locals.$scope.addableConstraints = ['abc']
      var result = locals.$scope.addConstraint(0);
      assert.deepEqual(locals.$scope.addableConstraints, []);
      assert.deepEqual(locals.$scope.model.constraints, ['abc']);
    });
  });
  describe('removeConstraint', function() {
    it('should do nothing when index is -1', function() {
      var result = locals.$scope.removeConstraint(-1);
      assert.isUndefined(result);
    });
    it('should remove constraint', function() {
      locals.$scope.addableConstraints = [];
      locals.$scope.model.constraints = ['abc'];
      var result = locals.$scope.removeConstraint(0);
      assert.deepEqual(locals.$scope.model.constraints, []);
      assert.deepEqual(locals.$scope.addableConstraints, ['abc']);
    });
  });
  describe('addFeature', function() {
    it('should do nothing when index is -1', function() {
      var result = locals.$scope.addFeature(-1);
      assert.isUndefined(result);
    });
    it('should add feature', function() {
      locals.$scope.addableFeatures = ['abc'];
      var result = locals.$scope.addFeature(0);
      assert.deepEqual(locals.$scope.addableFeatures, []);
      assert.deepEqual(locals.$scope.model.features, ['abc']);
    });
  });
  describe('removeFeature', function() {
    it('should do nothing when index is -1', function() {
      var result = locals.$scope.removeFeature(-1);
      assert.isUndefined(result);
    });
    it('should remove feature', function() {
      locals.$scope.addableFeatures = [];
      locals.$scope.model.features = ['abc']
      var result = locals.$scope.removeFeature(0);
      assert.deepEqual(locals.$scope.model.features, []);
      assert.deepEqual(locals.$scope.addableFeatures, ['abc']);
    });
  });
});
