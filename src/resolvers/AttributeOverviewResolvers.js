'use strict';
var pluck = require('lodash/collection/pluck');

module.exports = {
  Attribute: function($stateParams, SchemaSvc) {
    'ngInject';

    return SchemaSvc
      .getAttribute($stateParams.schema, $stateParams.attribute)
      .then(function(resp) {
        return resp.data;
      });
  }
}
