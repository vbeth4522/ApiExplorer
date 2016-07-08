'use strict';

var assign = require('lodash/object/assign');
var forOwn = require('lodash/object/forOwn');
var getPath = require('lodash/object/get');
var has = require('lodash/object/has');
var isArray = require('lodash/lang/isArray');
var isObject = require('lodash/lang/isObject');
var map = require('lodash/collection/map');
var partial = require('lodash/function/partial');
var pluck = require('lodash/collection/pluck');

function unpackTranslations(locale, field) {
  var copy = assign({}, field);
  forOwn(copy, function(v, k) {
    if (isObject(v) && has(v, 'values')) {
      copy[k] = getPath(v, 'values.' + locale, '')
    }
    if (isArray(v)) {
      copy[k] = map(v, partial(unpackTranslations, locale))
    }
  });
  return copy;
}

module.exports = function($q, NotificationsSvc) {
  'ngInject';

  this.makeAuthHeader = function(creds) {
    return 'Basic ' + btoa(creds.clientId + ':' + creds.clientSecret);
  }

  this.urlize = function(arr) {
    return arr.join('/');
  }

  this.unpackTranslations = unpackTranslations

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

    h.notifyErrorsAndReject = function(resp) {
        var errorMessage = getPath(resp, 'data.errors', "Unknown Error");
        NotificationsSvc.add({
          "type": "danger",
          "message": errorMessage
        });
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
