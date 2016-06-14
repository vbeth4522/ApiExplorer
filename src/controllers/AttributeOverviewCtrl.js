'use strict';
var omit = require('lodash/object/omit');

module.exports = function($scope, $state, $stateParams, SchemaSvc, Attribute) {
  'ngInject';

  $scope.schema = $stateParams.schema;
  $scope.attribute = $stateParams.attribute;
  $scope.fields = omit(Attribute, ['_self', 'name']);

  $scope.delete = function() {
    return SchemaSvc
      .deleteAttribute($scope.schema, $scope.attribute)
      .then(function(resp) {
        $state.go('schemaOverview', { schema: $scope.schema })
      });
  }
}
