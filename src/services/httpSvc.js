'use strict';
var extend = require('lodash/object/extend');
var getPath = require('lodash/object/get');
var partial = require('lodash/function/partial');

module.exports = function($http, $state, CredentialSvc, UtilSvc, RegionSvc, NotificationsSvc) {
  'ngInject';

  function toUrl(path) {
    return UtilSvc.urlize([RegionSvc.url()].concat(path))
  }

  function successCallback(response) {
    return response
  }

  function errorCallback(response) {
    if (response.status == 401 || response.status == 403) {
      var err = {
        type: 'danger',
        message: getPath(response, 'data.errors', "Unauthorized")
      };
      NotificationsSvc.remove(err);  // remove duplicate message if any
      NotificationsSvc.add(err);
      $state.go('auth');
    }
    return response;
  }

  function send(method, path, data) {
    var creds = CredentialSvc.get();
    var headers = {
      'Authorization': UtilSvc.makeAuthHeader(creds)
    };
    var config = {
      method: method,
      url: toUrl(path),
      data: data,
      headers: headers
    };
    return $http(config).then(successCallback, errorCallback);
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

  this.get = partial(send, 'get')
  this.delete = partial(send, 'delete')
  this.post = partial(send, 'post')
  this.put = partial(send, 'put')
  this.patch = partial(send, 'patch')

  this.serialGet = runAsSerialize(this.get)
  this.serialDelete = runAsSerialize(this.delete)
  this.serialPost = runAsSerialize(this.post)
  this.serialPut = runAsSerialize(this.put)
  this.serialPatch = runAsSerialize(this.patch)

  return this;
}
