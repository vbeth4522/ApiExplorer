'use strict';

module.exports = function(UtilsSvc, $http) {
  var basePath = [
    'beta',
    'meta',
    'fieldTypes'
  ]

  this.getFieldTypes = function() {
    return $http.get(UtilsSvc.urlize(basePath))
  }

  this.getFieldTypeAttributes = function(type) {
    return $http.get(UtilsSvc.urlize(basePath.concat([type])))
  }

  return this;
}
