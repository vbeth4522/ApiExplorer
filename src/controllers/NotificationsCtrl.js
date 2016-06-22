'use strict';
var remove = require('lodash/array/remove');

module.exports = function($scope, NotificationsSvc) {
  'ngInject';

  function init() {
    $scope.notifications = NotificationsSvc.get();
  };

  $scope.$on('NotificationsUpdated', function(event, notifications) {
    $scope.notifications = notifications;
  });

  $scope.remove = function(notification) {
    NotificationsSvc.remove(notification)
  };

  init();
};
