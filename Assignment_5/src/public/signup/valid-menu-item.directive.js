(function () {
  "use strict";

  angular.module('public')
    .directive('validMenuItem', validMenuItem);

  function validMenuItem() {
    var ddo = {
      restrict: "A", // restrict it to an attribute only directive

      require: "ngModel", // require a controller of the ng-model attribute

      link: function(scope, elem, attr, ctrl) {

        function customValidator(ngModelValue) {
          var validMenuItems = scope.sUCtrl.menuItems;

          if(validMenuItems.indexOf(ngModelValue) > -1) {
            ctrl.$setValidity("validMenuItem", true);
          } else {
            ctrl.$setValidity("validMenuItem", false);
          }

          return ngModelValue;
        }
        
        ctrl.$parsers.push(customValidator);
      }
    };

    return ddo;
  }
})();
