require('angular-mocks');
var angular = require('angular');
var sinon = require('sinon');
var helpers = require('../helpers')

var notifications = [];

describe("Notifications Controller", function() {
  var locals
  beforeEach(function() {
    angular.mock.module('capi-ui');
    angular.mock.inject(function($controller, $rootScope) {
      locals = {
        $scope: $rootScope.$new(),
        NotificationsSvc: helpers.makeNotificationsSvcStub()
      }
      locals.NotificationsSvc.get.returns(notifications)
      $controller('NotificationsCtrl',locals);
    });
  });
  describe('initial state', function() {
    it("should have the expected properties", function() {
      sinon.assert.calledOnce(locals.NotificationsSvc.get)
      assert.equal(locals.$scope.notifications, notifications);
    });
  });
  describe('remove', function() {
    it('should remove a notification', function() {
      var notification = {};
      locals.$scope.remove(notification);
      sinon.assert.calledWith(locals.NotificationsSvc.remove, notification)
    });
  });
  describe('on', function() {
    describe('NotificationsUpdated', function() {
      it('should update notifications', function() {
        var notifications = [];
        locals.$scope.$broadcast('NotificationsUpdated', notifications)
        locals.$scope.$digest();
        assert.equal(locals.$scope.notifications, notifications);
      });
    });
  });
});
