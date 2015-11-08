'use strict';

angular.module('ng.router').config(function ($urlRouterProvider, $stateProvider) {
  $stateProvider.state('common.main', {
    url: '/',
    views: {
      'section@common': {
        templateUrl: '../assets/client/app/common/main/main.html',
        controller: 'mainCtrl'
      }
    }
  });
});
