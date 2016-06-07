'use strict';
var Zip = require('jszip');
var _ = require('lodash');

module.exports = function($q) {
  'ngInject';

  var self = this;

  this.dump = function(zip) {
    return zip.generateAsync({type:"blob"})
  }

  this.load = function(data) {
    return (new Zip).loadAsync(data);
  }

  this.unzipMailTemplates = function(data, handler) {
    return self.load(data)
      .then(restructureMailTemplatesZipData)
      .then(_.partialRight(loadMailTemplatesZipFiles, handler));
  }

  this.zipMailTemplates = function(mailTemplates, fileName) {
    var zip = new Zip();
    var rootFolder = zip.folder(fileName)
    var groupedMailTemplates = _.groupBy(mailTemplates, _.first)
    _.forEach(groupedMailTemplates, function(mailTemplates, locale) {
      var folder = rootFolder.folder(locale);
      _.forEach(mailTemplates, function(mailTemplate) {
        var data = mailTemplate[1];
        folder.file(data.name+'.subject', data.subject);
        folder.file(data.name+'.text', data.textBody);
        folder.file(data.name+'.html', data.htmlBody);
      })
    })
    return zip;
  }

  function parseMailTemplateZipName(name) {
    var nameSplit = name.split('/');
    if (nameSplit.length !== 3) { return null; }
    var locale = nameSplit[1];
    var fullName = nameSplit[2];
    var fullNameSplit = fullName.split('.');
    if (fullNameSplit.length !== 2) { return null; }
    var baseName = _.first(fullNameSplit);
    var extension = _.last(fullNameSplit);
    return {
      name: name,
      locale: locale,
      fullName: fullName,
      baseName: baseName,
      extension: extension
    }
  }

  function restructureMailTemplatesZipData(zipData) {
    return _(zipData.files)
      .map(function(file) {
        file.name = parseMailTemplateZipName(file.name);
        return file;
      })
      .filter('name')
      .groupBy('name.locale')
      .mapValues(function(file) {
        return _(file)
          .groupBy('name.baseName')
          .mapValues(function(file){
            return _(file)
              .groupBy('name.extension')
              .mapValues(_.first)
              .value();
          })
          .value();
      })
      .value();
  }

  function loadMailTemplatesZipFiles(zipData, handler) {
    var promises = [];
    _.forEach(zipData, function(mailTemplates, locale) {
      _.forEach(mailTemplates, function(files, name) {
        var promise = $q.all([
          files.subject.async('string'),
          files.text.async('string'),
          files.html.async('string')
        ])
        .then(function(result) {
          return {
            subject: result[0],
            textBody: result[1],
            htmlBody: result[2]
          }
        })
        .then(function(mailTemplate) {
          return handler(locale, name, mailTemplate);
        });
        promises.push(promise);
      })
    })
    return $q.all(promises);
  }

  return this;
}

