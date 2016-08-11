'use strict';

var pluck = require('lodash/collection/pluck');
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
        return $q.all(
          pluck(result.data, "name")
          .map(self.get));
      })
      .then(function(results) {
        // Remove this when we move to lodash 4.14.1+
        var joined = intersect.apply(this,
          results.map(function(result) {
            return result.data.map(function(attr) {
              return attr.schemaAttribute;
            });
        }));

        if(joined.length == 0) return { data: [] };

        var result = [];
        var baseSchema = results[0].data;
        for(var i = 0; i < baseSchema.length; i++) {
          if(joined.indexOf(baseSchema[i].schemaAttribute) != -1) result = result.concat([baseSchema[i]]);
        }
        return {
          data: result
        };
        // Use this when we move to lodash 4.14.1+
        // return {
        //   data: intersectionBy.apply(this,
        //     results.map(function(result) {
        //       return result.data;
        //   }).concat(["schemaAttribute",]))
        // };
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
