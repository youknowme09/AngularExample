'use strict';

angular.module('ng.controller').controller('footerCtrl' ,
  function($scope, version) {

    $scope.version = version;
  }
);
