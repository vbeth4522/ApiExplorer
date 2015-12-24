'use strict';

var partial = require('lodash/function/partial');
var pluck = require('lodash/collection/pluck');

module.exports = function($q) {
  this.makeAuthHeader = function(creds) {
    return 'Basic ' + btoa(creds.clientId + ':' + creds.clientSecret);
  }

  this.urlize = function(arr) {
    return arr.join('/');
  }

  this.scopeHelpers = function($scope) {
    var h = {}
    h.pluckPropToScope = function(prop, scopeProp) {
      return function(resp) {
        $scope[scopeProp] = pluck(resp.data, prop)
      }
    }

    h.pluckNameToScope = partial(h.pluckPropToScope, 'name')

    h.grabErrorsAndReject = function(resp) {
      $scope.errors = resp.data.errors;
      return $q.reject(resp);
    }

    h.assignTo = function(prop) {
      return function(x) {
        $scope[prop] = x
      }
    }

    return h
  }

  return this;
}
