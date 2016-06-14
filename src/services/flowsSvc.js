'use strict';

module.exports = function(CredentialSvc, HttpSvc) {
  'ngInject';

  function basePath() {
    var creds = CredentialSvc.get();
    return [
      'config',
      creds.appId,
      'flows'
    ];
  }

  this.getAll = function() {
    return HttpSvc.get(basePath())
  }

  this.get = function(flow) {
    return HttpSvc.get(basePath().concat([flow]))
  }

  return this;
}
