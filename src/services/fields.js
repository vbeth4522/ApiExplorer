'use strict';

module.exports = function(CredentialSvc, HttpSvc) {
  var creds = CredentialSvc.get()
  var basePath = [
    'beta',
    'config',
    creds.appId,
    'flows'
  ]

  this.getAll = function(flow) {
    return HttpSvc.get(basePath.concat([flow, 'fields']))
  }

  this.get = function(flow, field) {
    return HttpSvc.get(basePath.concat([flow, 'fields', field]))
  }

  return this;
}
