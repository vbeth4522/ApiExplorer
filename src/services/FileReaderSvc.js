'use strict';

module.exports = function($q) {
  'ngInject';

  function decorator(func) {
    return function() {
      var defer = $q.defer();
      var fileReader = new FileReader();
      fileReader.onload = function() {
        defer.resolve(fileReader.result);
      };
      fileReader.onError = function() {
        defer.reject(fileReader.error);
      };
      var args = Array.prototype.slice.call(arguments);
      args.unshift(fileReader);
      func.apply(this, args);
      return defer.promise;
    }
  }

  this.readAsArrayBuffer = decorator(function(fileReader, file) {
    return fileReader.readAsArrayBuffer(file);
  });

  return this;
}
