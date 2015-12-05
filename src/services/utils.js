'use strict';

module.exports = function() {
  this.makeAuthHeader = function(creds) {
    return 'Basic ' + btoa(creds.clientId + ':' + creds.clientSecret);
  }

  this.urlize = function(arr) {
    return arr.join('/');
  }

  return this;
}
