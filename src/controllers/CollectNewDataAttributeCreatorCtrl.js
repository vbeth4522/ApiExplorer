'use strict';
var omit = require('lodash/object/omit');

module.exports = function($scope, $state, $stateParams, SchemaSvc, NotificationsSvc) {
  'ngInject';

  $scope.flow = $stateParams.flow;
  $scope.schema = $stateParams.schema;
  $scope.attribute = {}

  $scope.create = function() {
    return SchemaSvc
      .addAttribute($scope.schema, $scope.attribute.name, $scope.attribute)
      .then(function() {
        $state.go('collectNewData.addField', {
          flow: $scope.flow,
          schema: $scope.schema,
          attribute: $scope.attribute
        })
      })
      .catch(function(response) {
        var errorMessage = response.data.errors || "Unkown Error";
        NotificationsSvc.add({
          "type": "danger",
          "message": errorMessage
        });
        throw new Error;
      })
  }
}
