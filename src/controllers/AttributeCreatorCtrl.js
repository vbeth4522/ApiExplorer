'use strict';
var omit = require('lodash/object/omit');

module.exports = function($scope, $state, $stateParams, SchemaSvc, NotificationsSvc) {
  'ngInject';

  $scope.schema = $stateParams.schema;
  $scope.attribute = {}

  $scope.create = function() {
    return SchemaSvc
      .addAttribute($scope.schema, $scope.attribute.name, $scope.attribute)
      .then(function() {
        $state.go('schemaOverview', { schema: $scope.schema })
      })
      .catch(function(response) {
        var errorMessage = response.data.errors || "Unkown Error";
        NotificationsSvc.add({
          "type": "danger",
          "message": errorMessage
        });
        throw new Exception;
      })
  }
}
