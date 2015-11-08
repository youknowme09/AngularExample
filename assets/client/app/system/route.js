'use strict';

angular.module('ng.router').config(function ($urlRouterProvider, $stateProvider) {
  $stateProvider.state('system', {
    url: '/system',
    abstract: true,
    views: {
      '': {
        templateUrl: '../assets/client/common/layout/layout.html'
      },
      'header@system': {
        templateUrl: '../assets/client/common/layout/header.html',
        controller: 'headerCtrl'
      },
      'footer@system': {
        templateUrl: '../assets/client/common/layout/footer.html',
        controller : 'footerCtrl'
      }
    }
  });
});
