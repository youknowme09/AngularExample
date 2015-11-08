/**
 * Created by ansonliu on 2015/10/27.
 */
'use strict';

angular.module('ng.router').config(function ($urlRouterProvider, $stateProvider) {
  $stateProvider.state('common.main.todo', {
    url: 'todo',
    views: {
      'section@common': {
        templateUrl: '../assets/client/app/common/main/todo/todo.html',
        controller: 'todoCtrl'
      }
    }
  });
});
