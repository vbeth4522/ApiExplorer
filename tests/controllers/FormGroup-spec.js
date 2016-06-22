require('angular-mocks');
var _ = require('lodash');

describe("FormGroup Controller", function() {
  var locals;
  beforeEach(function() {
    angular.mock.module('capi-ui');
    angular.mock.inject(function($controller, $rootScope) {
      locals = {
        $scope: $rootScope.$new()
      }
      $controller('FormGroup', locals);
    });
  });
  /*
  describe('initial state', function() {
    it("should have the expected properties", function() {
      // Currently initial state is empty
    });
  });
  */
  describe('formGroupClassOptions', function() {
    it("has-success should be false when not in success state", function() {
      locals.$scope.states.success = _.constant(false);
      assert.isFalse(locals.$scope.formGroupClassOptions()['has-success']);
    });
    it("has-success should be true when in success state", function() {
      locals.$scope.states.success = _.constant(true);
      assert.isTrue(locals.$scope.formGroupClassOptions()['has-success']);
    });
    it("has-warning should be false when not in warning state", function() {
      locals.$scope.states.warning = _.constant(false);
      assert.isFalse(locals.$scope.formGroupClassOptions()['has-warning']);
    });
    it("has-warning should be true when in warning state", function() {
      locals.$scope.states.warning = _.constant(true);
      assert.isTrue(locals.$scope.formGroupClassOptions()['has-warning']);
    });
    it("has-error should be false when not in error state", function() {
      locals.$scope.states.danger = _.constant(false);
      assert.isFalse(locals.$scope.formGroupClassOptions()['has-error']);
    });
    it("has-error should be true when in error state", function() {
      locals.$scope.states.danger = _.constant(true);
      assert.isTrue(locals.$scope.formGroupClassOptions()['has-error']);
    });
  });
  describe('states', function() {
    describe('success', function() {
      it("should be success if form is valid", function() {
        locals.$scope.isValid = _.constant(true);
        assert.isTrue(locals.$scope.states.success());
      });
      it("should not be success if form is not valid", function() {
        locals.$scope.isValid = _.constant(false);
        assert.isFalse(locals.$scope.states.success());
      });
    });
    describe('warning', function() {
      it("should be warning if form is not valid and pristine", function() {
        locals.$scope.isInvalid = _.constant(true);
        locals.$scope.isPristine = _.constant(true);
        assert.isTrue(locals.$scope.states.warning());
      });
      it("should not be warning if form is valid", function() {
        locals.$scope.isInvalid = _.constant(false);
        assert.isFalse(locals.$scope.states.warning());
      });
      it("should not be warning if form is dirty", function() {
        locals.$scope.isInvalid = _.constant(true);
        locals.$scope.isPristine = _.constant(false);
        assert.isFalse(locals.$scope.states.warning());
      });
    });
    describe('danger', function() {
      it("should be danger if form is not valid and dirty", function() {
        locals.$scope.isInvalid = _.constant(true);
        locals.$scope.isDirty = _.constant(true);
        assert.isTrue(locals.$scope.states.danger());
      });
      it("should not be danger if form is valid", function() {
        locals.$scope.isInvalid = _.constant(false);
        assert.isFalse(locals.$scope.states.danger());
      });
      it("should not be danger if form is pristine", function() {
        locals.$scope.isInvalid = _.constant(true);
        locals.$scope.isDirty = _.constant(false);
        assert.isFalse(locals.$scope.states.danger());
      });
    });
  });
  describe('isValid', function() {
    it('should be true if form is valid', function() {
      locals.$scope.getField = function() {
        return { $valid: true };
      };
      assert.isTrue(locals.$scope.isValid());
    });
    it('should be false if form is not valid', function() {
      locals.$scope.getField = function() {
        return { $valid: false };
      };
      assert.isFalse(locals.$scope.isValid());
    });
  });
  describe('isInvalid', function() {
    it('should be true if form is invalid', function() {
      locals.$scope.getField = function() {
        return { $invalid: true };
      };
      assert.isTrue(locals.$scope.isInvalid());
    });
    it('should be false if form is not invalid', function() {
      locals.$scope.getField = function() {
        return { $invalid: false };
      };
      assert.isFalse(locals.$scope.isInvalid());
    });
  });
  describe('isPristine', function() {
    it('should be true if form is pristine', function() {
      locals.$scope.getField = function() {
        return { $pristine: true };
      };
      assert.isTrue(locals.$scope.isPristine());
    });
    it('should be false if form is not pristine', function() {
      locals.$scope.getField = function() {
        return { $pristine: false };
      };
      assert.isFalse(locals.$scope.isPristine());
    });
  });
  describe('isDirty', function() {
    it('should be true if form is dirty', function() {
      locals.$scope.getField = function() {
        return { $dirty: true };
      };
      assert.isTrue(locals.$scope.isDirty());
    });
    it('should be false if form is not dirty', function() {
      locals.$scope.getField = function() {
        return { $dirty: false };
      };
      assert.isFalse(locals.$scope.isDirty());
    });
  });
  describe('getField', function() {
    it('should get a field is it exists', function() {
      var formName = "testFormName";
      var name = "testName";
      var field = "abc";
      locals.$scope.formName = formName;
      locals.$scope.name = name;
      locals.$scope[formName] = {};
      locals.$scope[formName][name] = field;
      locals.$scope.$digest();
      assert.equal(locals.$scope.getField(), field);
    });
    it('should not get a field is it does not exists', function() {
      var formName = "testFormName";
      var name = "testName";
      locals.$scope.formName = formName;
      locals.$scope.name = name;
      locals.$scope.$digest();
      assert.isUndefined(locals.$scope.getField());
    });
  });
});
