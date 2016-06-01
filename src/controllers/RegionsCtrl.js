'use strict';

module.exports = function($scope, $state, RegionSvc) {
  'ngInject';

  function init() {
    $scope.regions = RegionSvc.regions();
    updateScopeRegion(null, RegionSvc.get());
  }

  function updateScopeRegion(event, region) {
    $scope.region = region
  }

  $scope.setRegion = function(region) {
    RegionSvc.set(region)
  }

  $scope.$on('regionUpdated', updateScopeRegion)

  init();
}
