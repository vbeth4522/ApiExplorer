'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');
var helpers = require('../helpers')

var flow = "testFlow"
var file = "testFile"

describe('MailTemplatesImportCtrl', function() {
  var locals;
  var $q;

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller, _$q_) {
      $q = _$q_ ;
      locals = {
        $scope: $rootScope.$new(),
        $stateParams: {
          flow: flow
        },
        MailTemplateSvc: helpers.makeMailTemplateSvcStub($q),
        FileReaderSvc: helpers.makeFileReaderSvcStub($q),
        ZipSvc: helpers.makeZipSvcStub($q)
      }
      $controller('MailTemplatesImportCtrl', locals)
    });
  });

  describe('initial state', function() {
    it('should initilize the scope', function() {
      assert.deepEqual(locals.$scope.results, []);
    });
  });
  describe('printResult', function() {
    it('should import file', function() {
      var result = { locale: "en-US", name: "name" }
      assert.equal(locals.$scope.printResult(result), "en-US name");
    });
  });
  describe('import', function() {
    it('should import file', function() {
      locals.$scope.file = file
      locals.$scope.import();
      locals.$scope.$digest();
      sinon.assert.calledWith(locals.FileReaderSvc.readAsArrayBuffer, file);
      sinon.assert.called(locals.ZipSvc.unzipMailTemplates);
    });
  });
});
