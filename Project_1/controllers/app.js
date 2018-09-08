(function () {

  "use strict" // to prevent bleeding of variables in the global space

  var foodLimit = 3; // declare a foodLimit for the eating

  // main app for the angular
  angular.module("LunchCheck", [])

  .controller("LunchCheckController", LunchCheckController);

  // protection of DI against minification
  LunchCheckController.$injector = ["$scope"]

  // define the LunchCheckController function
  function LunchCheckController($scope) {
    // a scope variable for the foodItems
    $scope.foodItems = ""; // initially an empty string
    // a scope variable to store the message to be displayed as a part of the things
    $scope.message = ""; // initially an empty string
    // a scope variable to make the div in the html hidden or visible
    $scope.hidden = "hidden"; // initially it is hidden
    // a scope variable for changing the color of the message displayed
    $scope.stat = ""; // initially no status

    // function to be bound to the button
    $scope.checkLunch = function () {
      var parameters = calculateStatus($scope.foodItems);
      $scope.message = parameters.message; // get the display message:
      $scope.stat = parameters.status;
      makeHiddenVisible(); // display it on screen
    }

    function makeHiddenVisible() {
      $scope.hidden = ""; // remove the bootstrap class hidden from the html element
    }

    function changeStat(newStat) {
      $scope.stat = newStat;
    }

    // function to calculate the status of the amount of food eaten
    function calculateStatus(foodItemsBlob) {
      // if it is an emptyt string, then
      if(foodItemsBlob == "") {
        // case when the input is empty
        return {
            status: "danger",
            message: "Please enter data first"
        };

      } else {
        // case when there are items in the list
        var foodItemsList = foodItemsBlob.split(",");
        // iterate upon the elements in the list and get the foodCount
        var foodCount = 0; // initialize the foodCount to zero
        for (var i = 0; i < foodItemsList.length; i++) {
          var foodItem = foodItemsList[i];
          if(foodItem.trim() != "") {
            foodCount++;
          }
        }

        // finally check if it is too much or within the eating limit:
        if(foodCount <= foodLimit) {
          return {
            status: "success",
            message: "Enjoy!"
          };
        } // else:
        return {
          status: "success",
          message: "Too much!"
        };
      }
    }
  }

})();
