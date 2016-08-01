'use strict';

var intersect = require('lodash/array/intersection');

module.exports = function(CredentialSvc, HttpSvc, $q) {
  'ngInject';

  var self = this;

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

  this.getAllIntersect = function() {
    return self.getAll()
      .then(function(result) {
        return $q.all(result.data.map(self.get));
      })
      .then(function(results) {
        return {
          data: intersect.apply(this,
            results.map(function(result) {
              return result.data;
          }))
        };
      });
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
