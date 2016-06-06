'use strict';
var _ = require('lodash')
require('angular-mocks')
var angular = require('angular')
var sinon = require('sinon')

describe('ZipSvc', function() {
  var ZipSvc;
  var $rootScope;
  var zip;

  beforeEach(function() {
    angular.mock.module('capi-ui')
    angular.mock.inject(function(_ZipSvc_, _$rootScope_) {
      ZipSvc = _ZipSvc_;
      $rootScope = _$rootScope_;
      zip = {
        generateAsync: sinon.stub()
      }
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
      // TODO: I don't know how to test this.
    });
  });
  describe('zipMailTemplates', function() {
    it('should zip files', function() {
      var mailTemplates = [
        ['en-US', {name: 'name1', subject: "subject1", textBody: "textBody1", htmlBody: "htmlBody1"}],
        ['en-US', {name: 'name2', subject: "subject2", textBody: "textBody2", htmlBody: "htmlBody2"}],
        ['en-EU', {name: 'name3', subject: "subject3", textBody: "textBody3", htmlBody: "htmlBody3"}]
      ]
      var zipped = ZipSvc.zipMailTemplates(mailTemplates);
      assert.deepEqual(_.keys(zipped.files), [
        'mailTemplates/',
        'mailTemplates/en-US/',
        'mailTemplates/en-US/name1.subject',
        'mailTemplates/en-US/name1.text',
        'mailTemplates/en-US/name1.html',
        'mailTemplates/en-US/name2.subject',
        'mailTemplates/en-US/name2.text',
        'mailTemplates/en-US/name2.html',
        'mailTemplates/en-EU/',
        'mailTemplates/en-EU/name3.subject',
        'mailTemplates/en-EU/name3.text',
        'mailTemplates/en-EU/name3.html'
      ])
    });
  });
  describe('unzipMailTemplates', function() {
    it('should unzip files', function() {
      // TODO: I don't know how to test this.
    });
  });
});
