'use strict';

module.exports = function($scope, $stateParams, Attributes) {
  'ngInject';

  $scope.schema = $stateParams.schema;
  $scope.attributes = Attributes;
}
