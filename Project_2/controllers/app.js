(function () {
  "use strict";

  //noinspection JSUnresolvedFunction
    angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingList", ShoppingListCheckOffService);



  // definition of ToBuyController
  ToBuyController.$inject = ["ShoppingList"]; // inject the defined service in the controller
  function ToBuyController(ShoppingList) {
    var toBuy = this;

    // retrieve the toBuyList from the ShoppingListService
    toBuy.shopList = ShoppingList.toBuyList;

    // state variables for the item name and item quantity
    toBuy.itemName = "";
    toBuy.itemQuantity = "";

    // state variable for error message
    toBuy.errMessage = "";

    // function to call the buymethod of the service
    toBuy.buyItem = function (index) {
      ShoppingList.buy(index);
    };

    // function to call the addMethod of the service
    toBuy.addItem = function () {
      var item = {
        name: toBuy.itemName,
        quantity: Number(toBuy.itemQuantity)
      };

      try {
        ShoppingList.addItemToShopList(item);
        resetItem(); // reset the item properties
        resetErrorMessage(); // reset the error message
      } catch (err) {
          toBuy.errMessage = err.message;
      }

    };

    // function to reset the error message
    function resetErrorMessage() {
      toBuy.errMessage = "";
    }

    // function to reset the name and quantity fields
    function resetItem() {
      toBuy.itemName = "";
      toBuy.itemQuantity = "";
    }
  }

  // definition of AlreadyBoughtController
  AlreadyBoughtController.$inject = ["ShoppingList"]; // inject the defined service in the controller
  function AlreadyBoughtController(ShoppingList) {
    var alreadyBought = this;

    // retrieve the alreadyBoughtItems list from the service
    alreadyBought.boughtList = ShoppingList.alreadyBoughtList;
  }


  // Lets define the service first:
  function ShoppingListCheckOffService() {
    var service = this; // to get the reference of the object of itself

    service.toBuyList = []; // initially empty ToBuyItemsList
    service.alreadyBoughtList = []; // initially empty alreadyBoughtList

    // method to buy an item
    service.buy = function (index) {
      var item = service.toBuyList[index]; // get the element at the index position
      service.toBuyList.splice(index, 1); // remove the element from the first list
      service.alreadyBoughtList.push(item); // add the element to the already bought list
    };

    // method to add an Item to the List
    service.addItemToShopList = function (item) {
      if(item.name !== "" && item.quantity > 0) {
          service.toBuyList.push(item);
      } else {
        throw new Error("Item name is empty or quantity is zero ");
      }
    };

  }

})();
