'use strict';
var keys = require('lodash/object/keys');

var defaultRegion = 'us'

module.exports = function($rootScope, $window, RegionMap) {
  'ngInject';

  var storeKey = 'capi-region';
  var region = defaultRegion;

  function loadCredsFromLocalStorage() {
    var stored_region = $window.localStorage.getItem(storeKey);
    if (stored_region) {
      region = stored_region;
      $rootScope.$broadcast('regionUpdated', region);
    }
  }

  this.get = function() {
    return region;
  }

  this.url = function() {
    return RegionMap[region];
  }

  this.regions = function() {
    return keys(RegionMap);
  }

  this.set = function(newRegion) {
    region = newRegion;
    $rootScope.$broadcast('regionUpdated', region);
    $window.localStorage.setItem(storeKey, region);
  }

  this.clear = function() {
    $window.localStorage.removeItem(storeKey)
    region = defaultRegion;
    $rootScope.$broadcast('regionUpdated', region)
    return region
  }

  loadCredsFromLocalStorage();
}
