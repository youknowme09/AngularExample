'use strict';

angular.module('ng.router').config(function ($urlRouterProvider, $stateProvider) {
  $stateProvider.state('system.roleResourceMapping', {
    url: '/roleResourceMapping',
    views: {
      'section@system': {
        templateUrl: '../assets/client/app/system/roleResourceMapping/roleResourceMapping.html',
        controller: 'roleResourceMappingCtrl'
      }
    }
  });
});
