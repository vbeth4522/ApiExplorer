'use strict';
var pluck = require('lodash/collection/pluck');

module.exports = {
  Attributes: function($stateParams, SchemaSvc) {
    'ngInject';

    return SchemaSvc
      .get($stateParams.schema)
      .then(function(resp) {
        return pluck(resp.data, 'schemaAttribute');
      });
  }
}
