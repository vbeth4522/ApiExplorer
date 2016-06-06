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

  this.get = flow(toUrl, $http.get)
  this.delete = flow(toUrl, $http.delete)
  this.post = partial(sendDataVia, 'post')
  this.put = partial(sendDataVia, 'put')
  this.patch = partial(sendDataVia, 'patch')

  this.serialGet = flow(toUrl, $http.get)
  this.serialDelete = flow(toUrl, $http.delete)
  this.serialPost = partial(sendDataVia, 'post')
  this.serialPut = partial(sendDataVia, 'put')
  this.serialPatch = partial(sendDataVia, 'patch')

  return this;
}
