(function () {
  "use strict";

  // register the service on the data module
  angular.module("data")
    .service("MenuDataService", MenuDataService);

  // define the service
  MenuDataService.$inject = ["$http", "APIBasePath"]; // injected services
  function MenuDataService($http, APIBasePath) {
    var service = this; // good practice to rename the this variable

    this.getAllCategories = function () { // this method returns the available categories for food
      return $http({
        method: "GET",
        url: (APIBasePath + "categories.json")
      }).then(function (result) {
            return result.data;
      });
    };

    this.getItemsForCategory = function (categoryShortName) {
      return $http({
        method: "GET",
        url: (APIBasePath + "menu_items.json"),
        params: {
          category: categoryShortName
        }
      }).then(function (result) {
          return result.data;
      });
    };
  }

})();
