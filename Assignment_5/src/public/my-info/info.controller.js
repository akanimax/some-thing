(function () {
  "use strict";

  angular.module('public')
    .controller('InfoController', InfoController);

  InfoController.$inject = ['SignupService', 'MenuService'];
  function InfoController(SignupService, MenuService) {
    var infoCtrl = this;

    infoCtrl.dataStatus = SignupService.alreadySignedUp();

    if(infoCtrl.dataStatus) {
      // i.e if the data is already available in the stored service

      infoCtrl.userInfo = SignupService.fetchUserInfo();


      // fetch the menu-item realated information from the server
      MenuService.getMenuItem(infoCtrl.userInfo.fav).then(function(data) {
        infoCtrl.favMenuItem = data;
      });

    }

  }

})();
