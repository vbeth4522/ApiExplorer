'use strict';

module.exports = function(CredentialSvc, HttpSvc) {
  'ngInject';

  function basePath() {
    var creds = CredentialSvc.get()
    return [
      'config',
      creds.appId,
      'schemas'
    ];
  }

  this.getAll = function() {
    return HttpSvc.get(basePath())
  }

  this.get = function(schema) {
    return HttpSvc.get(basePath().concat([schema]))
  }

  return this;
}
