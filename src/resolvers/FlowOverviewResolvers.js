'use strict';
var pluck = require('lodash/collection/pluck');

module.exports = {
  Flow: function($stateParams, FlowSvc) {
    'ngInject';

    return FlowSvc
      .get($stateParams.flow)
      .then(function(resp) {
        return resp.data
      });
  },
  Fields: function($stateParams, FieldSvc) {
    'ngInject';

    return FieldSvc
      .getAll($stateParams.flow)
      .then(function(resp) {
        return pluck(resp.data, 'name')
      });
  },
  Forms: function($stateParams, FormSvc) {
    'ngInject';

    return FormSvc
      .getAll($stateParams.flow)
      .then(function(resp) {
        return pluck(resp.data, 'name')
      });
  },
  Locales: function($stateParams, LocaleSvc) {
    'ngInject';

    return LocaleSvc
      .getAll($stateParams.flow)
      .then(function(resp) {
        return pluck(resp.data, 'name')
      });
  },
  MailTemplates: function($stateParams, MailTemplateSvc) {
    'ngInject';

    return MailTemplateSvc
      .getAll($stateParams.flow)
      .then(function(resp) {
        return pluck(resp.data, 'name')
      });
  }
}
