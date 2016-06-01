'use strict';

module.exports = function(UtilSvc, HttpSvc) {
  'ngInject';

  var basePath = [
    'meta',
    'fieldTypes'
  ]

  this.getFieldTypes = function() {
    return HttpSvc.get(basePath)
  }

  this.getFieldTypeAttributes = function(type) {
    return HttpSvc.get(basePath.concat([type]))
  }

  return this;
}
