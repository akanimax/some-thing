(function () {
  "use strict"; // to prevent the variables from leaking into the global scope

  angular.module("menuApp")
    .config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // define the root url
    // which is also the url to be displayed if no matches are found
    $urlRouterProvider.otherwise("/");

    /** Setup the states for the application **/
    $stateProvider

    // The home page for the web application
    .state("home", {
      url: "/",
      templateUrl: "src/menu-app/template/home-page.template.html"
    })

    // summarized view of the categories available for the menu
    .state("categories", {
      url: "/categories",
      templateUrl: "src/menu-app/template/categories.template.html",
      controller: "CategoriesController as catControl",
      resolve: {
        categories: ["MenuDataService", function (MenuDataService) {
            return MenuDataService.getAllCategories();
        }]
      }
    })

    // detail items inside a particular category
    .state("itemDetail", {
      url: "/items/{sName}",
      templateUrl: "src/menu-app/template/categories.items.template.html",
      controller: "ItemsController as iControl",
      resolve: {
        menuItems: ["MenuDataService", "$stateParams",
          function (MenuDataService, $stateParams) {
            return MenuDataService.getItemsForCategory($stateParams.sName);
        }]
      }
    });

  }

})();
