'use strict';
var extend = require('lodash/object/extend');

module.exports = function($http, CredentialSvc, UtilsSvc, CapiBaseDomain) {
  var creds = CredentialSvc.get()
  var config = {
    headers: {
      Authorization: UtilsSvc.makeAuthHeader(creds)
    }
  };

  this.get = function(path) {
    var url = UtilsSvc.urlize([CapiBaseDomain].concat(path))
    return $http.get(url, config)
  }

  this.put = function(path, data) {
    var url = UtilsSvc.urlize([CapiBaseDomain].concat(path))
    var putConfig = extend(
      { headers: { 'Content-Type': 'application/json' } },
      config
    )
    return $http.put(url, data, putConfig)
  }
  return this;
}
