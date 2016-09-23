'use strict';

var partial = require('lodash/function/partial');
var clone = require('lodash/lang/clone');
var isEmpty = require('lodash/lang/isEmpty');
var some = require('lodash/collection/some.js');
var blankCreds = partial(
  clone,
  {}
)
var blankCred = partial(
  clone,
  {
    appId: null,
    clientId: null,
    clientSecret: null
  }
)

module.exports = function($rootScope, $window, RegionSvc) {
  'ngInject';

  var storeKey = 'capi-creds';
  var credentials = blankCreds()

  function loadCredsFromSession() {
    var region = RegionSvc.get();
    var stored_creds = JSON.parse($window.sessionStorage.getItem(storeKey));
    if (stored_creds) {
      credentials = stored_creds
      $rootScope.$broadcast('credentialsUpdated', credentials[region])
    }
  }

  function hasCredsForRegion(region) {
    if (isEmpty(credentials[region])) {
      credentials[region] = blankCred();
    }
    return credentials[region]
  }

  this.hasAnyCreds = function() {
    return some(RegionSvc.regions(), function(region) {
        var creds = hasCredsForRegion(region);
        return creds.appId && creds.clientId && creds.clientSecret
    });
  };

  this.get = function() {
    var region = RegionSvc.get();
    return hasCredsForRegion(region);
  };

  this.set = function(appId, clientId, clientSecret) {
    var region = RegionSvc.get();
    credentials[region] = blankCred();
    credentials[region].appId = appId;
    credentials[region].clientId = clientId;
    credentials[region].clientSecret = clientSecret;
    $rootScope.$broadcast('credentialsUpdated', credentials[region])
    $window.sessionStorage.setItem(storeKey, JSON.stringify(credentials))
  }

  this.clear = function() {
    $window.sessionStorage.removeItem(storeKey);
    var region = RegionSvc.get();
    RegionSvc.regions().forEach(function(r) {
        credentials[r] = blankCred();
    });
    $rootScope.$broadcast('credentialsUpdated', credentials[region]);
    return credentials[region];
  }

  loadCredsFromSession()
}
