(function () {
  "use strict" // to protect us from bleeding variables in the global scope

  angular.module("valueCalculator", [])

  .controller("valueCalculatorController", function ($scope) {
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

  });

})();
