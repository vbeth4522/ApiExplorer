'use strict';
var _ = require('lodash')
require('angular-mocks')
var angular = require('angular')
var sinon = require('sinon')
var Zip = require('jszip');

describe('ZipSvc', function() {
  var ZipSvc;
  var $rootScope;
  var $window;
  var $q;
  var zip;
  var ZipMock;

  beforeEach(function() {
    zip = {
      generateAsync: sinon.stub(),
      loadAsync: sinon.stub(),
      folder: sinon.stub(),
      file: sinon.stub()
    }
    zip.folder.returns(zip)
    ZipMock = function() { return zip; }
    angular.mock.module('capi-ui')
    angular.mock.module(function ($provide) {
      $provide.value('$window', {
        Zip: ZipMock
      });
    });
    angular.mock.inject(function(_ZipSvc_, _$rootScope_, _$window_, _$q_) {
      ZipSvc = _ZipSvc_;
      $rootScope = _$rootScope_;
      $window = _$window_;
      $q = _$q_;
    });
  });
  afterEach(function() {
  });

  describe('dump', function() {
    it('should call generateAsync', function() {
      ZipSvc.dump(zip);
      sinon.assert.called(zip.generateAsync, { type: "blob" })
    });
  });
  describe('load', function() {
    it('should call loadAsync', function() {
      var blob = new Blob();
      ZipSvc.load(blob);
      sinon.assert.calledWith(zip.loadAsync, blob)
    });
  });
  describe('zipMailTemplates', function() {
    it('should zip files', function() {
      var filename = 'mailTemplates';
      var mailTemplates = [
        ['en-US', {name: 'name1', subject: "subject1", textBody: "textBody1", htmlBody: "htmlBody1"}],
        ['en-US', {name: 'name2', subject: "subject2", textBody: "textBody2", htmlBody: "htmlBody2"}],
        ['en-EU', {name: 'name3', subject: "subject3", textBody: "textBody3", htmlBody: "htmlBody3"}]
      ]
      var zipped = ZipSvc.zipMailTemplates(mailTemplates, filename);
      sinon.assert.callCount(zipped.folder, 3);
      sinon.assert.calledWith(zipped.folder, filename);
      sinon.assert.calledWith(zipped.folder, 'en-US');
      sinon.assert.calledWith(zipped.folder, 'en-EU');
      sinon.assert.callCount(zipped.file, 9);
      sinon.assert.calledWith(zipped.file, 'name1.subject', mailTemplates[0][1].subject);
      sinon.assert.calledWith(zipped.file, 'name1.text', mailTemplates[0][1].textBody);
      sinon.assert.calledWith(zipped.file, 'name1.html', mailTemplates[0][1].htmlBody);
      sinon.assert.calledWith(zipped.file, 'name2.subject', mailTemplates[1][1].subject);
      sinon.assert.calledWith(zipped.file, 'name2.text', mailTemplates[1][1].textBody);
      sinon.assert.calledWith(zipped.file, 'name2.html', mailTemplates[1][1].htmlBody);
      sinon.assert.calledWith(zipped.file, 'name3.subject', mailTemplates[2][1].subject);
      sinon.assert.calledWith(zipped.file, 'name3.text', mailTemplates[2][1].textBody);
      sinon.assert.calledWith(zipped.file, 'name3.html', mailTemplates[2][1].htmlBody);
    });
  });
  describe('unzipMailTemplates', function() {
    it('should unzip files', function() {
      var blob = new Blob();
      var zipObject = { async: sinon.stub().returns("abc") }
      var zipObjects = {
        files: {
          'mailTemplate/':  _.extend({}, zipObject, {name: 'mailTemplates/'}),
          'mailTemplate/en-US/':  _.extend({}, zipObject, {name: 'mailTemplates/en-US/'}),
          'mailTemplate/en-US/a.html': _.extend({}, zipObject, {name: 'mailTemplates/en-US/a.html'}),
          'mailTemplate/en-US/a.text': _.extend({}, zipObject, {name: 'mailTemplates/en-US/a.text'}),
          'mailTemplate/en-US/a.subject': _.extend({}, zipObject, {name: 'mailTemplates/en-US/a.subject'}),
          'mailTemplate/en-EU/':  _.extend({}, zipObject, {name: 'mailTemplates/en-EU/'}),
          'mailTemplate/en-EU/b.html': _.extend({}, zipObject, {name: 'mailTemplates/en-EU/b.html'}),
          'mailTemplate/en-EU/b.text': _.extend({}, zipObject, {name: 'mailTemplates/en-EU/b.text'}),
          'mailTemplate/en-EU/b.subject': _.extend({}, zipObject, {name: 'mailTemplates/en-EU/b.subject'}),
        }
      }
      var handler = sinon.stub()
      zip.loadAsync.returns($q.when(zipObjects));
      ZipSvc.unzipMailTemplates(blob, handler)
      sinon.assert.calledWith(zip.loadAsync, blob)
      $rootScope.$digest();
      sinon.assert.calledWith(handler, 'en-US', 'a', { htmlBody: "abc", subject: "abc", textBody: "abc" })
      sinon.assert.calledWith(handler, 'en-EU', 'b', { htmlBody: "abc", subject: "abc", textBody: "abc" })
    });
  });
});
