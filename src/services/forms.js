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
    return HttpSvc.get(basePath.concat([flow, 'forms']))
  }

  this.get = function(flow, form) {
    return HttpSvc.get(basePath.concat([flow, 'forms', form]))
  }

  return this;
}
