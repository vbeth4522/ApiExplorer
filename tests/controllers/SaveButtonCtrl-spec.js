'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');

function assertIdleState($scope) {
  assert.strictEqual($scope.text, $scope.idleText)
  assert.isFalse($scope.internalDisabled)
  assert.sameMembers($scope.classes, ['btn', 'btn-lg', 'btn-block', 'btn-primary'])
}

function assertWorkingState($scope) {
  assert.strictEqual($scope.text, 'Saving...')
  assert.isTrue($scope.internalDisabled)
  assert.sameMembers($scope.classes, ['btn', 'btn-lg', 'btn-block', 'btn-primary'])
}

function assertSuccessState($scope) {
  assert.strictEqual($scope.text, 'Success!')
  assert.isFalse($scope.internalDisabled)
  assert.sameMembers($scope.classes, ['btn', 'btn-lg', 'btn-block', 'btn-success'])
}

function assertErrorState($scope) {
  assert.strictEqual($scope.text, 'Error')
  assert.isTrue($scope.internalDisabled)
  assert.sameMembers($scope.classes, ['btn', 'btn-lg', 'btn-block', 'btn-danger'])
}

describe('SaveButtonCtrl', function() {
  var $scope;
  var $timeout;
  var $q;
  var locals;

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller, _$q_, _$timeout_) {
      var $scope = $rootScope.$new()
      $scope.idleText = 'idle text'
      $scope.saveFn = sinon.stub()
      $timeout = _$timeout_
      $q = _$q_
      locals = {
        $scope: $scope,
        $timeout: $timeout
      }
      $controller('SaveButtonCtrl', locals)
    })
  })
  describe('save', function() {
    it('should show a successful save when saveFn returns a resolved promise', function() {
      locals.$scope.saveFn.returns($q.when())
      assertIdleState(locals.$scope)
      locals.$scope.save()
      assertWorkingState(locals.$scope)
      locals.$scope.$apply()
      assertSuccessState(locals.$scope)
      locals.$timeout.flush(2000)
      assertIdleState(locals.$scope)
    });
    it('should show an error when saveFn returns a rejected promise', function() {
      locals.$scope.saveFn.returns($q.reject())
      assertIdleState(locals.$scope)
      locals.$scope.save()
      assertWorkingState(locals.$scope)
      locals.$scope.$apply()
      assertErrorState(locals.$scope)
      locals.$timeout.flush(2000)
      assertIdleState(locals.$scope)
    });
  });
});
