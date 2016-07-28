'use strict';

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
    return this.getAll()
      .then(function(result) {
        return $q.all(
          result.data.map(function(schema_obj) {
            return self.get(schema_obj.name);
        }));
      })
      .then(function(results) {
        var schemas = results.map(function(result) {
          return result.data.map(function(attribute) {
            return attribute.schemaAttribute;
          });
        });
        for(var i = 1; i < schemas.length; i++) {
          schemas[0] = schemas[0].filter(function(n) { return schemas[i].indexOf(n) != -1; });
        }
        return { data: schemas[0].map(function(value) { return {schemaAttribute:value}; }) };
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
