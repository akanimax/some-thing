(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['menuItemsNumbers', 'SignupService'];
  function SignUpController(menuItemsNumbers, SignupService) {
    var sUCtrl = this;

    sUCtrl.menuItems = [];
    for(var i = 0; i < menuItemsNumbers.menu_items.length; i++) {
      sUCtrl.menuItems.push(menuItemsNumbers.menu_items[i].short_name);
    }

    sUCtrl.user = {}; // initialized to an empty object

    sUCtrl.message = "";

    sUCtrl.saveInfo = function () {
      if(!SignupService.alreadySignedUp()) {
        SignupService.saveInfo(sUCtrl.user);
        setSuccessfulMessage();
      } else {
        setUnsuccessfulMessage();
      }
    };

    function setSuccessfulMessage() {
      sUCtrl.message = "Your information has been saved";
    }

    function setUnsuccessfulMessage() {
      sUCtrl.message = "You have already signed up for this session";
    }

    function resetMessage() {
      sUCtrl.message = "";
    }
  }

})();
