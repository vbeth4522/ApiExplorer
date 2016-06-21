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
      assert.lengthOf(locals.$scope.addableConstraints, 3);
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
  describe('hasNested', function() {
    it('should be true when $scope.model.type is "plural"', function() {
      locals.$scope.model = { type: "plural" }
      assert.isTrue(locals.$scope.hasNested())
    });
    it('should be true when $scope.model.type is "object"', function() {
      locals.$scope.model = { type: "object" }
      assert.isTrue(locals.$scope.hasNested())
    });
    it('should be false when $scope.model.type is anything else', function() {
      locals.$scope.model = { type: "x" }
      assert.isFalse(locals.$scope.hasNested())
    });
    it('should be false when $scope.model does not contain type', function() {
      locals.$scope.model = {}
      assert.isFalse(locals.$scope.hasNested())
    });
    it('should be true when passed "plural"', function() {
      assert.isTrue(locals.$scope.hasNested("plural"))
    });
    it('should be true when passed "object"', function() {
      assert.isTrue(locals.$scope.hasNested("object"))
    });
    it('should be false when passed anything else', function() {
      locals.$scope.model = { type: "x" }
      assert.isFalse(locals.$scope.hasNested("x"))
    });
  });
  describe('hasLength', function() {
    it('should be true when $scope.model.type is "string"', function() {
      locals.$scope.model = { type: "string" }
      assert.isTrue(locals.$scope.hasLength())
    });
    it('should be false when $scope.model.type is anything else', function() {
      locals.$scope.model = { type: "x" }
      assert.isFalse(locals.$scope.hasLength())
    });
    it('should be false when $scope.model does not contain type', function() {
      locals.$scope.model = {}
      assert.isFalse(locals.$scope.hasLength())
    });
    it('should be true when passed "string"', function() {
      assert.isTrue(locals.$scope.hasLength("string"))
    });
    it('should be false when passed anything else', function() {
      assert.isFalse(locals.$scope.hasLength("x"))
    });
  });
  describe('addNested', function() {
    it('should add empty object when called', function() {
      locals.$scope.model = { attr_defs: [] }
      locals.$scope.addNested()
      assert.deepEqual(locals.$scope.model.attr_defs, [{}])
    });
    it('should add value passed when called', function() {
      locals.$scope.model = { attr_defs: [] }
      locals.$scope.addNested("x")
      assert.deepEqual(locals.$scope.model.attr_defs, ["x"])
    });
  });
  describe('removeNested', function() {
    it('should remove element at index', function() {
      locals.$scope.model = { attr_defs: [{}] }
      locals.$scope.removeNested(0)
      assert.deepEqual(locals.$scope.model.attr_defs, [])
    });
  });
  describe('pathName', function() {
    it('should be "" when parentName is falsely and model.name is falsely', function() {
      locals.$scope.parentName = null;
      locals.$scope.model.name = null;
      assert.equal(locals.$scope.pathName(), "")
    });
    it('sholud be "a" when parentName is falsely and model.name is "a"', function() {
      locals.$scope.parentName = null;
      locals.$scope.model.name = "a";
      assert.equal(locals.$scope.pathName(), "a")
    });
    it('should be "a." when parentName is "a" and model.name is falsely', function() {
      locals.$scope.parentName = "a";
      locals.$scope.model.name = null;
      assert.equal(locals.$scope.pathName(), "a.")
    });
    it('should be "a.b" when parentName is "a" and model.name is "b"', function() {
      locals.$scope.parentName = "a";
      locals.$scope.model.name = "b";
      assert.equal(locals.$scope.pathName(), "a.b")
    });
  });
  describe('watch', function() {
    describe('model.type', function() {
      it('should add attr_defs when type becomes "plural"', function() {
        locals.$scope.model = { type: "plural" }
        locals.$scope.$digest();
        assert.deepEqual(locals.$scope.model.attr_defs, [{}])
      });
      it('should add attr_defs when type becomes "object"', function() {
        locals.$scope.model = { type: "object" }
        locals.$scope.$digest();
        assert.deepEqual(locals.$scope.model.attr_defs, [{}])
      });
      it('should remove attr_defs when type becomes something other than "object" or "plural"', function() {
        locals.$scope.model = { type: "string" }
        locals.$scope.$digest();
        assert.isUndefined(locals.$scope.model.attr_defs)
      });
    });
    describe('model.length', function() {
      it('should delete length when null', function() {
        locals.$scope.model = { length: null }
        locals.$scope.$digest();
        assert.isUndefined(locals.$scope.model.length)
      });
      it('should delete length when null', function() {
        locals.$scope.model = { length: undefined }
        locals.$scope.$digest();
        assert.isUndefined(locals.$scope.model.length)
      });
      it('should delete length when null', function() {
        locals.$scope.model = { length: 0 }
        locals.$scope.$digest();
        assert.isDefined(locals.$scope.model.length)
      });
    });
  });
});
