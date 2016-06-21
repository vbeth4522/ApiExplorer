'use strict';
var extend = require('lodash/object/extend');
var flow = require('lodash/function/flow');
var partial = require('lodash/function/partial');

module.exports = function($http, CredentialSvc, UtilSvc, RegionSvc) {
  'ngInject';

  function setHeaders() {
    var creds = CredentialSvc.get();
    $http.defaults.headers.common.Authorization = UtilSvc.makeAuthHeader(creds);
  }

  function toUrl(path) {
    return UtilSvc.urlize([RegionSvc.url()].concat(path))
  }

  function sendDataVia(method, path, data) {
    setHeaders();
    return $http[method](toUrl(path), data)
  }

  var promise = null;

  function serialize(newPromise) {
    if (!promise) {
      promise = newPromise();
    } else {
      promise = promise.then(function() { return newPromise() });
    }
    promise.catch(function() { console.log("failed") });
    return promise;
  }

  function runAsSerialize(func) {
    return function() {
      var args = Array.prototype.slice.call(arguments);
      return serialize(func.bind.apply(func, [null].concat(args)))
    }
  }

  function httpGet() {
    setHeaders();
    return $http.get.apply(null, arguments);
  }

  function httpDelete() {
    setHeaders();
    return $http.delete.apply(null, arguments);
  }

  this.get = flow(toUrl, httpGet)
  this.delete = flow(toUrl, httpDelete)
  this.post = partial(sendDataVia, 'post')
  this.put = partial(sendDataVia, 'put')
  this.patch = partial(sendDataVia, 'patch')

  this.serialGet = runAsSerialize(this.get)
  this.serialDelete = runAsSerialize(this.delete)
  this.serialPost = runAsSerialize(this.post)
  this.serialPut = runAsSerialize(this.put)
  this.serialPatch = runAsSerialize(this.patch)

  return this;
}
