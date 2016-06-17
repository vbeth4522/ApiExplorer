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

  this.getAttribute = function(schema, attribute) {
    return HttpSvc.get(basePath().concat([schema, attribute]))
  }

  this.addAttribute = function(schema, attribute, attribute_def) {
    return HttpSvc.put(basePath().concat([schema, attribute]), attribute_def)
  }

  this.deleteAttribute = function(schema, attribute) {
    return HttpSvc.delete(basePath().concat([schema, attribute]))
  }

  return this;
}
