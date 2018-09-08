(function () {
  "use strict";

  angular.module("menuApp")
    .directive("jumboTitle", jumboTitleDirective);

  function jumboTitleDirective() {
    var ddo = {
      templateUrl: "src/menu-app/template/jumbo-title.template.html",
      scope: {
        title: "@"
      }
    };

    return ddo;
  }

})();
