(function () {
  "use strict"

  var app = angular.module("NarrowItDownApp", []);

  /*
  * Custom directives to be used in the application
  */

  // styling directive
  app.directive("jumboStyle", jumboStyleDirective);
  function jumboStyleDirective() {
    var ddo = {
      templateUrl: "templates/jumbo-style.html",
      scope: {
        title: "@title"
      }
    };

    return ddo;
  }

  // menu-card directive
  app.directive("menuCard", menuCardDirective);
  function menuCardDirective() {
    var ddo = {
      templateUrl: "templates/menu-card-display.html",
      scope: {
        title: "@title"
      },
      controller: NarrowItDownController,
      controllerAs: "nidc"
    };

    return ddo;
  }

  // menu-items directive
  app.directive("menuItems", menuItemsDirective);
  function menuItemsDirective() {
    var ddo = {
      templateUrl: "templates/menu-items-display.html",
      scope: {
        items: "<items",
        onRemove: "&onRemove"
      }
    };

    return ddo;
  }

  /*
  * Contorllers to be used in the application
  */

  // controller to handle the narrow it down user case
  NarrowItDownController.$inject = ["MenuSearch"];
  function NarrowItDownController(MenuSearch) {
    // to mathc with the controller as syntax
    var nidc = this;

    // scope variable to display current elements on the screen
    nidc.searchTerm = "";
    nidc.menu_items = [];

    // error message variable
    nidc.message = "";


    nidc.getNarrowedData = function() {
      resetMenuItems();

      if(nidc.searchTerm.length == 0) {
        setErrorMessage();
      } else {
        MenuSearch.getMatchedMenuItems(nidc.searchTerm).then(function(response) {
          if(response.length != 0) {
            nidc.menu_items = response;
            resetErrorMessage();
          } else {
            setErrorMessage();
          }
        }).catch(function(error) {
          console.log("error in retrieving data");
        });
      }

      resetSearchTerm();
    };

    // remove an item from the list if the user wishes to do so
    nidc.removeItem = function (index) {
      nidc.menu_items.splice(index, 1);
    };

    // function to set the message
    function setErrorMessage() {
      nidc.message = "Nothing Found!";
    }

    // function to set the message
    function resetErrorMessage() {
      nidc.message = "";
    }

    // function to reset the searchTerm
    function resetSearchTerm() {
      nidc.searchTerm = "";
    }

    // function to reset the menuItems list
    function resetMenuItems() {
      nidc.menu_items = [];
    }
  }

  /*
  * Services to be used in the application
  */

  // Service to fetch the Menu data from the server
  app.service("MenuSearch", MenuSearchService);
  MenuSearchService.$inject = ["$http"];
  function MenuSearchService($http) {
    var service = this;

    // method to get the data and skim it
    this.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      }).then(function (result) {
        // process the result and then return only the ones that have the searchTerm in them
        var allItems = result.data.menu_items;
        var foundItems = [];

        for(var i = 0; i < allItems.length; i++) {
          var name = allItems[i].name.toLowerCase();
          var desc = allItems[i].description.toLowerCase();

          if(name.indexOf(searchTerm) !== -1 || desc.indexOf(searchTerm) !== -1) {
            foundItems.push(allItems[i]);
          }
        }

        return foundItems.reverse();

      }).catch(function (error) {
        console.log("Server not Responding");
      });
    };

  }
})();
