'use strict';
var pluck = require('lodash/collection/pluck');

module.exports = {
  Flows: function($stateParams, FlowSvc) {
    'ngInject';

    return FlowSvc
      .getAll()
      .then(function(resp) {
        return pluck(resp.data, 'name');
      });
  },
  Schemas: function($stateParams, SchemaSvc) {
    'ngInject';

    return SchemaSvc
      .getAll()
      .then(function(resp) {
        return pluck(resp.data, 'name');
      });
  }
}
