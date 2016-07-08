'use strict';
var pluck = require('lodash/collection/pluck');

module.exports = {
  Schemas: function($stateParams, SchemaSvc) {
    'ngInject';

    return SchemaSvc
      .getAll()
      .then(function(resp) {
        return pluck(resp.data, 'name');
      });
  }
}
