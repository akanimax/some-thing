(function () {
  "use strict" // to protect us from bleeding variables in the global scope

  angular.module("valueCalculator", [])

  .controller("valueCalculatorController", valueCalculatorController)

  .controller("DIController", DIController)

  .controller("bulbController", bulbController)

  .controller("filterController", filterController)

  .controller("repeatController", repeatController)

  .filter("loveMessage", loveMessage);

  valueCalculatorController.$injector = ["$scope"];

  DIController.$injector = ["$scope", "$filter"];

  bulbController.$injector = ["$scope"];

  filterController.$injector = ["$scope", "loveMessageFilter"];

  repeatController.$injector = ["$scope"];

  function valueCalculatorController ($scope) {
    $scope.name = "";
    $scope.value = 0;

    $scope.calculateValue = function () {
      var totalValue = getNumericValue($scope.name);
      $scope.value = totalValue;
    };

    function getNumericValue(string) {
        var count = 0;
        for(var i = 0; i < string.length; i++) {
          count += string.charCodeAt(i);
        }

        return count;
    }
  }

  function DIController ($scope, $filter) {
      $scope.name = "Animesh";

      $scope.upper = function () {
        var makeUpper = $filter("uppercase");
        $scope.name = makeUpper($scope.name);
      };
  }

  function bulbController ($scope) {
    $scope.stateOfBulb = "off";

    $scope.changeBulbState = function () {
      if($scope.stateOfBulb == "on") {
        $scope.stateOfBulb = "off";
      } else {
        $scope.stateOfBulb = "on";
      }
    };
  }

  function filterController($scope, loveMessageFilter) {
    $scope.amount = 50.75;

    $scope.filteredMessage = loveMessageFilter("Animesh likes to love hot chicks");
  }

  // factory function for the custom filter
  function loveMessage() {
    return function (input) {
      var input = input || "";
      input = input.replace("likes", "loves");
      return input;
    }
  }

  function repeatController($scope) {
    $scope.ShoppingList = [
      "Eggs", "Roshomon", "marshmellows", "nogat", "nutella"
    ];
  }

})();
