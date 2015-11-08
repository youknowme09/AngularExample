/**
 * Created by ansonliu on 2015/10/27.
 */

(function () {

  angular.module('ng.controller').controller('todoCtrl', todoCtrl);


  todoCtrl.$inject = ['$scope', '$http', 'Role'];

  function todoCtrl($scope, $http) {

    $scope.todoList = []; // init empty list


    $scope.clickBtn = function(){
      alert('click btn');
    }

    activate();


    // -------------------------------------------
    function activate() {

      //Role.findByid('123').then(....);

      $http(
        {
          method: 'GET',
          url: 'http://localhost:8080/TodoService/todo'
        }
      ).then(function (response) {

          $scope.todoList = response.data._embedded.todo;

        }, function (err) {

        })

    }


  }

}());
