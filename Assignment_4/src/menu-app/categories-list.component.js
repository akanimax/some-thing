(function () {
  "use strict";

  angular.module("menuApp")
    .component("categoriesList", {
      templateUrl: "src/menu-app/template/categories-list.template.html",
      bindings: {
        categories: "<"
      },
      controller: categoriesListController
    });

  function categoriesListController() {
    var $ctrl = this;

    console.log($ctrl);
    console.log($ctrl.categories);
  }

})();
