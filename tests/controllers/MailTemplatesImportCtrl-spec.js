'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');

var flow = "testFlow"
var file = "testFile"

describe('MailTemplatesImportCtrl', function() {
  var MailTemplatesImportCtrl;
  var $scope;
  var $stateParams;
  var $q;
  var MailTemplateSvc;
  var FileReaderSvc;
  var ZipSvc;

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function($rootScope, $controller, _$q_) {
      $q = _$q_ ;
      $scope = $rootScope.$new()
      $stateParams = {
        flow: flow
      }
      MailTemplateSvc = {
        get: sinon.stub().returns($q.when([])),
        getAll: sinon.stub().returns($q.when([]))
      }
      FileReaderSvc = {
        readAsArrayBuffer: sinon.stub().returns($q.when([]))
      }
      ZipSvc = {
        unzipMailTemplates: sinon.stub().returns($q.when({}))
      }
      $controller(
        'MailTemplatesImportCtrl',
        {
          $scope: $scope,
          $stateParams: $stateParams,
          MailTemplateSvc: MailTemplateSvc,
          FileReaderSvc: FileReaderSvc,
          ZipSvc: ZipSvc
        }
      )
    });
  });

  describe('initial state', function() {
    it('should initilize the scope', function() {
      assert.deepEqual($scope.results, []);
    });
  });
  describe('import', function() {
    it('should import file', function() {
      $scope.file = file
      $scope.import();
      $scope.$digest();
      sinon.assert.calledWith(FileReaderSvc.readAsArrayBuffer, file);
      sinon.assert.called(ZipSvc.unzipMailTemplates);
    });
  });
});
