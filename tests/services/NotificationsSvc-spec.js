'use strict';
require('angular-mocks')
var angular = require('angular')
var sinon = require('sinon')

describe('NotificationsSvc', function() {
  var NotificationsSvc;
  var $rootScope;

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.module(function ($provide) {
    });
    angular.mock.inject(function(_NotificationsSvc_, _$rootScope_) {
      NotificationsSvc = _NotificationsSvc_;
      $rootScope = _$rootScope_;
      sinon.spy($rootScope, '$broadcast');
    });
  });
  afterEach(function() {
    $rootScope.$broadcast.restore();
  });

  describe('get', function() {
    it('should get an empty array', function() {
      var result = NotificationsSvc.get()
      assert.isArray(result)
      assert.lengthOf(result, 0)
    });
  });

  describe('add', function() {
    it('should add a notification', function() {
      var notification = {}
      NotificationsSvc.add({})
      sinon.assert.calledWith($rootScope.$broadcast, 'NotificationsUpdated', [notification])
    });
  });

  describe('remove', function() {
    it('should remove a notification', function() {
      var notification = {}
      NotificationsSvc.remove({})
      sinon.assert.calledWith($rootScope.$broadcast, 'NotificationsUpdated', [])
    });
  });
});
