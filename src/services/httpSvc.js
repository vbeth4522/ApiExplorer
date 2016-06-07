'use strict';
var extend = require('lodash/object/extend');
var flow = require('lodash/function/flow');
var partial = require('lodash/function/partial');

module.exports = function($http, CredentialSvc, UtilSvc, RegionSvc) {
  'ngInject';

  var creds = CredentialSvc.get()
  $http.defaults.headers.common.Authorization = UtilSvc.makeAuthHeader(creds)

  function toUrl(path) {
    return UtilSvc.urlize([RegionSvc.url()].concat(path))
  }

  function sendDataVia(method, path, data) {
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

  this.get = flow(toUrl, $http.get)
  this.delete = flow(toUrl, $http.delete)
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
