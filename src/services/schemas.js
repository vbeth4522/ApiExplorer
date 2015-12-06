'use strict';

module.exports = function(CredentialSvc, HttpSvc) {
  var creds = CredentialSvc.get()
  var basePath = [
    'beta',
    'config',
    creds.appId,
    'schemas'
  ]

  this.getAll = function() {
    return HttpSvc.get(basePath)
  }

  this.get = function(schema) {
    return HttpSvc.get(basePath.concat([schema]))
  }

  return this;
}
