'use strict';
var pluck = require('lodash/collection/pluck');

module.exports = function($scope, Flows, Schemas) {
  'ngInject';

  $scope.flowNames = Flows;
  $scope.schemas = Schemas;
}
