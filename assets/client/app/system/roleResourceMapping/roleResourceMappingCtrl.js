"use strict";

angular.module('ng.controller').controller('roleResourceMappingCtrl', ['$scope', '$window',
  '$state', '$stateParams', '$q', 'Role', 'Resource', 'RoleResourceMapping',
  function ($scope, $window, $state, $stateParams, $q, Role, Resource, RoleResourceMapping) {


    $scope.afterDataLoaded = false;
    $scope.editRoleState = "ADD";
    $scope.editResourceState = "ADD";
    $scope.roleList = [];
    $scope.resourceList = [];
    $scope.role;
    $scope.resource;



    function init(){
      resetRole();
      resetResource();
    }


    function resetResource(){
      $scope.resource = {"name" : "", "type" : ""};
    }
    function resetRole(){
      $scope.role = { "name" : "", "description" : "" };
    }



    $scope.r_types = ["type", "processRole"];
    $scope.legalPersonalityList = [];
    $scope.resourceList = [];
    $scope.roleList = [];
    $scope.roleResourceMappingList = [];

    $scope.legalPersonalityFullRoleList = [];

    $q.all([
      Role.find({}).$promise,
      Resource.find({}).$promise,
      RoleResourceMapping.find({}).$promise
    ]).then(function (data) {
      $scope.roleList = data[0];
      $scope.resourceList = data[1];
      $scope.roleResourceMappingList = data[2];
      $scope.afterDataLoaded = true;
    }, function (error) {

    });

    // ------------------------------------------------------------------------------------

    $scope.change = function (rrm) {
      if (!rrm.isSelect) {
        // new a roleResourceMapping
        RoleResourceMapping.deleteById( {id: rrm.id }).$promise.then(function(){
          rrm.id = undefined;
        });
      }else {
        RoleResourceMapping.create(rrm, function(item){
          angular.copy(item, rrm);
        });
      }
    };

    $scope.hasMapping = function (roleUUID, resourceUUID) {
      var tempObj = { appRoleId: roleUUID, resourceId: resourceUUID, id: '', isSelect: false };

      var index = _.findIndex($scope.roleResourceMappingList, function(item){
        return item.appRoleId == roleUUID && item.resourceId == resourceUUID;
      });

      if( index > -1){
        tempObj = $scope.roleResourceMappingList[index];
        tempObj.isSelect = true;
      }
      return tempObj;
    };

    // ----------------------------------------------------------------------------------------
    // Resource CRUD part
    // ----------------------------------------------------------------------------------------
    $scope.openResourceModal = function(state, clickItem){
      $scope.editResourceState = state;
      $scope.resource = angular.copy(clickItem);
    }

    $scope.addNewResourceItem = function () {

      Resource.create($scope.resource, function(resource){
        $scope.resourceList.push(resource);
        resetResource();
      });
    };

    $scope.updateResourceItem = function () {
      Resource.upsert($scope.resource, function(resource){
        var index = _.findIndex($scope.resourceList, function(item){
          return item.id === resource.id;
        });
        if(index > -1){
          $scope.resourceList[index] = resource;
        }
        resetResource();
      });
    };

    $scope.deleteResourceItem = function () {
      Resource.deleteById({id:$scope.resource.id}).$promise.then(function(){
        var index = _.findIndex($scope.resourceList, function(item){
          return item.id === $scope.resource.id;
        });
        if(index > -1){
          $scope.resourceList.splice(index, 1);
          resetResource();
        }
      });
    };

    // -----------------------------------------------------------------------------------
    // Role CRUD part
    // -----------------------------------------------------------------------------------

    $scope.openRoleModal = function(state, clickItem){
      $scope.editRoleState = state;
      $scope.role = angular.copy(clickItem);
    }

    $scope.addNewRoleItem = function () {

      if ($scope.role.roleName == "")
        return;

      Role.create($scope.role, function(role){
        $scope.roleList.push(role);
        resetRole();
      });
    };

    $scope.updateRoleItem = function () {

      Role.upsert($scope.role, function(role){
        var index = _.findIndex($scope.roleList, function(item){
          return item.id === role.id;
        });
        if(index > -1){
          $scope.roleList[index] = role;
        }
        resetRole();
      });
    };

    $scope.deleteRoleItem = function () {
      Role.deleteById({id:$scope.role.id}).$promise.then(function(){
        var index = _.findIndex($scope.roleList, function(item){
          return item.id === $scope.role.id;
        });
        if(index > -1){
          $scope.roleList.splice(index, 1);
          resetRole();
        }
      });
    };


    // -----------------------------------------------------------------------------------
    // Enterprise CRUD part
    // -----------------------------------------------------------------------------------


    $scope.openNewEnterpriseModal = function () {
      $scope.editEnterpriseState = "ADD";
      $scope.newEnterpriseItem = {
        "Name": "",
        "Company_Owner_Name": "",
        "Security_Id": "",
        "Company_Contact_Name": "",
        "Telephone": "",
        "Mobile_Phone": "",
        "Fax": "",
        "Vendor_Url": "",
        "Email": "",
        "Address": "",
        "Vendor_Profile": "",
        "Service_Region": "",
        "Invoice_Title": "",
        "Invoice_No": ""
      };

      $('#editableEnterpriseModal').modal('show');
    };

    $scope.addNewEnterpriseItem = function () {
      $('#editableEnterpriseModal').modal('hide');
      // console.log('newEnterpriseItem', $scope.newEnterpriseItem);
      if ($scope.newEnterpriseItem.Name == "")
        return;
      enterpriseService.postEnterprise($scope.newEnterpriseItem, function (success) {

        $state.go($state.current, {}, {reload: true});

      }, function (error) {

        if (error.data)
          alert(error.data.errorMsg);

      });
    };

    $scope.openUpdateEnterpriseModal = function (clickEnterpriseItem) {

      if (clickEnterpriseItem.Id == "") return;

      $scope.editEnterpriseState = "UPDATE";
      $scope.newEnterpriseItem = clickEnterpriseItem;
      // console.log(clickEnterpriseItem);
      $('#editableEnterpriseModal').modal('show');
    };

    $scope.updateEnterpriseItem = function () {
      $('#editableEnterpriseModal').modal('hide');
      // console.log('editEnterpriseItem', $scope.newEnterpriseItem);

      enterpriseService.updateEnterpriseById({id: $scope.newEnterpriseItem.Id}, $scope.newEnterpriseItem, function (success) {
        // console.info('enterpriseService updateEnterpriseById success!!');
        // $scope.editEnterpriseState = "ADD" ;
        // $scope.newEnterpriseItem = { } ;
        $state.go($state.current, {}, {reload: true});
      }, function (error) {
        //   console.error('enterpriseService updateEnterpriseById error......');
        if (error.data)
          alert(error.data.errorMsg);

      });
    };

    $scope.openDeleteEnterpriseModal = function (clickEnterpriseItem) {

      if (clickEnterpriseItem.Id == "") return;

      $scope.editEnterpriseState = "DELETE";
      $scope.newEnterpriseItem = angular.copy(clickEnterpriseItem);
      $('#editableEnterpriseModal').modal('show');
    };

    $scope.deleteEnterpriseItem = function () {
      $('#editableEnterpriseModal').modal('hide');
      // console.log('deleteEnterpriseItem', $scope.newEnterpriseItem);

      enterpriseService.deleteEnterpriseById({id: $scope.newEnterpriseItem.Id}, $scope.newEnterpriseItem, function (success) {
        //console.info('enterpriseService deleteEnterpriseById success!!');
        // $scope.editEnterpriseState = "ADD" ;
        // $scope.newEnterpriseItem = { } ;
        $state.go($state.current, {}, {reload: true});
        if (error.data)
          alert(error.data.errorMsg);


      }, function (error) {
        // console.error('enterpriseService deleteEnterpriseById error......');
      });
    };



  }]);
