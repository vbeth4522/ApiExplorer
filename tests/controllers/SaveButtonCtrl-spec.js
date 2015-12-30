'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');

function assertIdleState($scope) {
  assert.strictEqual($scope.text, $scope.idleText)
  assert.isFalse($scope.disabled)
  assert.sameMembers($scope.classes, ['btn', 'btn-lg', 'btn-block', 'btn-primary'])
}

function assertWorkingState($scope) {
  assert.strictEqual($scope.text, 'Saving...')
  assert.isTrue($scope.disabled)
  assert.sameMembers($scope.classes, ['btn', 'btn-lg', 'btn-block', 'btn-primary'])
}

function assertSuccessState($scope) {
  assert.strictEqual($scope.text, 'Success!')
  assert.isFalse($scope.disabled)
  assert.sameMembers($scope.classes, ['btn', 'btn-lg', 'btn-block', 'btn-success'])
}

function assertErrorState($scope) {
  assert.strictEqual($scope.text, 'Error')
  assert.isTrue($scope.disabled)
  assert.sameMembers($scope.classes, ['btn', 'btn-lg', 'btn-block', 'btn-danger'])
}

describe('SaveButtonCtrl', function() {
  var SaveButtonCtrl
  var $scope
  var $timeout
  var $q

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller, _$q_, _$timeout_) {
      $scope = $rootScope.$new()
      $timeout = _$timeout_
      $q = _$q_
      $scope.idleText = 'idle text'
      $scope.saveFn = sinon.stub()
      $controller(
        'SaveButtonCtrl',
        {
          $scope: $scope,
          $timeout: $timeout
        }
      )
    })
  })
  describe('save', function() {
    it('should show a successful save when saveFn returns a resolved promise', function() {
      $scope.saveFn.returns($q.when())
      assertIdleState($scope)
      $scope.save()
      assertWorkingState($scope)
      $scope.$apply()
      assertSuccessState($scope)
      $timeout.flush(2000)
      assertIdleState($scope)
    });
    it('should show an error when saveFn returns a rejected promise', function() {
      $scope.saveFn.returns($q.reject())
      assertIdleState($scope)
      $scope.save()
      assertWorkingState($scope)
      $scope.$apply()
      assertErrorState($scope)
      $timeout.flush(2000)
      assertIdleState($scope)
    });
  });
});
