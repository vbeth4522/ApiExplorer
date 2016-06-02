'use strict';

require('angular-mocks')
var angular = require('angular');
var sinon = require('sinon');

describe('RegionsCtrl', function() {
  var $scope
  var $state
  var RegionSvc
  var defaultRegion;
  var defaultRegionUrl;
  var regions;

  beforeEach(function() {
    angular.mock.module('capi-ui');
    angular.mock.inject(function($rootScope, $controller) {
      defaultRegion = 'us';
      defaultRegionUrl = 'http://example.com';
      regions = [defaultRegion];
      $scope = $rootScope.$new();
      $state = {
        go: sinon.spy()
      }
      RegionSvc = {
        get: sinon.stub().returns(defaultRegion),
        url: sinon.stub().returns(defaultRegionUrl),
        regions: sinon.stub().returns(regions),
        set: sinon.spy()
      }
      $controller(
        'RegionsCtrl',
        {
          $scope: $scope,
          $state: $state,
          RegionSvc: RegionSvc
        }
      )
    });
  });

  describe('initial state', function() {
    it('should set the scope regions and region', function() {
      sinon.assert.called(RegionSvc.regions)
      sinon.assert.called(RegionSvc.get)
      assert.equal($scope.regions, regions);
      assert.equal($scope.region, defaultRegion);
    });
  });
  describe('setRegion', function() {
    it('should set the region and update the scope', function() {
      var newRegion = 'eu';
      $scope.setRegion(newRegion);
      sinon.assert.calledWithExactly(RegionSvc.set, newRegion);
    });
  });
  describe('updateScopeRegion', function() {
    it('should update the scope on regionUpdated event', function() {
      var newRegion = 'eu';
      $scope.$broadcast('regionUpdated', newRegion);
      assert.equal($scope.region, newRegion);
    });
  });
});
