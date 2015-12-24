'use strict';
var extend = require('lodash/object/extend');

module.exports = function($http, CredentialSvc, UtilSvc, CapiBaseDomain) {
  var creds = CredentialSvc.get()
  var config = {
    headers: {
      Authorization: UtilSvc.makeAuthHeader(creds)
    }
  };

  this.get = function(path) {
    var url = UtilSvc.urlize([CapiBaseDomain].concat(path))
    return $http.get(url, config)
  }

  this.put = function(path, data) {
    var url = UtilSvc.urlize([CapiBaseDomain].concat(path))
    var putConfig = extend(
      { headers: { 'Content-Type': 'application/json' } },
      config
    )
    return $http.put(url, data, putConfig)
  }

  this.patch = function(path, data) {
    var url = UtilSvc.urlize([CapiBaseDomain].concat(path))
    var putConfig = extend(
      { headers: { 'Content-Type': 'application/json' } },
      config
    )
    return $http.patch(url, data, putConfig)
  }

  return this;
}
