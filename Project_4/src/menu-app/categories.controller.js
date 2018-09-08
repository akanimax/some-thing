(function () {
  "use strict";

  angular.module("menuApp")
    .controller("CategoriesController", CategoriesController);

  CategoriesController.$inject = ["categories"];
  function CategoriesController(categories) {
    var catControl = this;

    catControl.cats = categories;
  }

})();
