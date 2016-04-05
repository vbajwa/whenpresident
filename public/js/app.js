"use strict";

(function(){
  angular
  .module("whenPresident", [
    "ngResource",
    "ui.router"
  ])
  .config([
    "$stateProvider",
    "$urlRouterProvider",
    "$locationProvider",
    Router
  ])
  .controller("indexCtrl", indexCtrl);

  function Router($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/public/html/app-welcome.html"
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "/public/html/candidates-index.html",
      controller: "indexCtrl",
      controllerAs: "vm"
    });
    $urlRouterProvider.otherwise("/");
  }

  function indexCtrl(){
    var vm = this;
    vm.candidates = [
      {
        name: "Alice",
        year: 1
      },
      {
        name: "Bob",
        year: 2
      },
      {
        name: "Carol"
      }
    ];
  }

})();
