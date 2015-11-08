'use strict';

angular.module('web starter kit', [
  'ng.router', 'ng.controller', 'ng.model', 'ng.service', 'ng.directive']);

//url slash
angular.module('web starter kit').config(
  function ($httpProvider, $urlRouterProvider) {
    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.url();

      // check to see if the path already has a slash where it should be
      if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
        return;
      }

      if (path.indexOf('?') > -1) {
        return path.replace('?', '/?');
      }

      return path + '/';
    });
    $urlRouterProvider.otherwise('/');
  }).value('version', $("meta[name='version']").attr('content'));

angular.element(document).ready(function () {
  angular.bootstrap(document, ['web starter kit']);
});
