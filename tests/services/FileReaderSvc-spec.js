'use strict';

require('angular-mocks')
var angular = require('angular')
var sinon = require('sinon')

describe('FileReaderSvc', function() {
  var FileReaderSvc;
  var $rootScope;
  var file;

  beforeEach(function() {
    file = new Blob(["foo", "bar"])
    angular.mock.module('capi-ui')
    angular.mock.inject(function(_FileReaderSvc_, _$rootScope_) {
      FileReaderSvc = _FileReaderSvc_
      $rootScope = _$rootScope_
    });
  });
  afterEach(function() {
  });

  describe('readAsArrayBuffer', function() {
    it('success', function() {
      FileReaderSvc.readAsArrayBuffer(file)
      // TODO: I don't know how to test this.
    });
    it('fail', function() {
      FileReaderSvc.readAsArrayBuffer(file)
      // TODO: I don't know how to test this.
    });
  });
});
