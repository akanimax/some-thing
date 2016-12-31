(function () {
  "use strict";

  angular.module("menuApp")
    .controller("ItemsController", ItemsController);

  ItemsController.$inject = ["menuItems"];
  function ItemsController(menuItems) {
    var iControl = this;

    // create a scope property for accessing the menuItems and the category short_name
    iControl.items = menuItems.menu_items;
    iControl.name = menuItems.category.name;
  }

})();
