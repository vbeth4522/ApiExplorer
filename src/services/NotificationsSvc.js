'use strict';
var remove = require('lodash/array/remove');

module.exports = function($rootScope) {
  'ngInject';

  var notifications = [];

  this.get = function() {
    return notifications.splice();
  }

  this.add = function(notification) {
    notifications.push(notification)
    $rootScope.$broadcast('NotificationsUpdated', notifications)
  }

  this.remove = function(notification) {
    remove(notifications, notification);
    $rootScope.$broadcast('NotificationsUpdated', notifications)
  }
}
