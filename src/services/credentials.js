'use strict';

var constant = require('lodash/utility/constant');
var blankCreds = constant({
  appId: null,
  clientId: null,
  clientSecret: null
})

module.exports = function($rootScope, $window) {
  var storeKey = 'capi-creds';
  var credentials = blankCreds()

  function loadCredsFromSession() {
    var stored_creds = JSON.parse($window.sessionStorage.getItem(storeKey));
    if (stored_creds) {
      credentials = stored_creds
      $rootScope.$broadcast('credentialsUpdated', credentials)
    }
  }

  this.get = function() {
    return credentials;
  }

  this.set = function(appId, clientId, clientSecret) {
    credentials.appId = appId;
    credentials.clientId = clientId;
    credentials.clientSecret = clientSecret;
    $rootScope.$broadcast('credentialsUpdated', credentials)
    $window.sessionStorage.setItem(storeKey, JSON.stringify(credentials))
  }

  this.clear = function() {
    $window.sessionStorage.removeItem(storeKey)
    credentials = blankCreds()
    $rootScope.$broadcast('credentialsUpdated', credentials)
    return credentials
  }

  loadCredsFromSession()
}
