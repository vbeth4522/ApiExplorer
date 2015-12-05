'use strict';

module.exports = function($http, CredentialSvc, UtilsSvc, CapiBaseDomain) {
  var creds = CredentialSvc.get()
  var authHeader = UtilsSvc.makeAuthHeader(creds)

  this.get = function(path) {
    var url = UtilsSvc.urlize([CapiBaseDomain].concat(path))
    return $http.get(url, { headers: { 'Authorization' : authHeader }})
  }
  return this;
}
