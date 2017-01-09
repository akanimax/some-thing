(function () {
  "use strict";

  angular.module('public')
    .service("SignupService", SignupService);

  function SignupService() {
    var service = this;

    // the method to save the information in the user object
    service.saveInfo = function(userInfo) {
      service.user = userInfo;
    };

    // method to check if the object is defined or not
    service.alreadySignedUp = function () {
      if(service.user) {
        return  true;
      } else {
        return false;
      }
    };

    // method to return the saved information
    service.fetchUserInfo = function () {
        return service.user;
    };
  }
})();
