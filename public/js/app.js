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
  ]);

  function Router($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/public/html/app-welcome.html"
    })
    .state("index", {
      url: "/candidates",
      template: "This is the candidates index route."
    });
    $urlRouterProvider.otherwise("/");
  }
})();
