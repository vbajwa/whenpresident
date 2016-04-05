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
  .factory("Candidate", Candidate)
  .controller("indexCtrl", indexCtrl)
  .controller("showCtrl", showCtrl);

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
    })
    .state("show", {
      url: "/candidates/:name",
      templateUrl: "/public/html/candidates-show.html",
      controller: "showCtrl",
      controllerAs: "vm"
    });
    $urlRouterProvider.otherwise("/");
  }

  Candidate.$inject = [ "$resource" ];
  function Candidate($resource){
    var Candidate = $resource("/api/candidates/:name");
    Candidate.all = Candidate.query();
    return Candidate;
  }

  indexCtrl.$inject = [ "Candidate" ];
  function indexCtrl(Candidate){
    var vm = this;
    vm.candidates = Candidate.all;
  }

  showCtrl.$inject = [ "$stateParams", "Candidate" ];
  function showCtrl($stateParams, Candidate){
    var vm = this;
    Candidate.all.$promise.then(function(){
      Candidate.all.forEach(function(candidate){
        if(candidate.name === $stateParams.name){
          vm.candidate = candidate;
        }
      });
    });
  }

})();
