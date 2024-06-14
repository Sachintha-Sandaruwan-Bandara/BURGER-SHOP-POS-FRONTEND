import { items } from "../db/db.js";
import { updateItemListInPlaceOrder } from "./placeOrderController.js";
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("item-code").value = generateItemId();
});
var itemSave = document.getElementById("item-save");
var itemList = document.getElementById("item-cards");
var itemSearchTxt = document.getElementById("txt-item-search");
var itemSearchBtn = document.getElementById("btn-item-search");

//for preloaded customer
updateItemList();

function generateItemId() {
  // Extract numeric part of customer IDs
  var itemNumbers = items.map((item) => {
    return parseInt(item.code.replace("I", ""), 10);
  });

  // Find the highest number and increment it
  var maxNumber = itemNumbers.length > 0 ? Math.max(...itemNumbers) : 0;
  var newNumber = maxNumber + 1;

  // Pad the number with leading zeros
  var newId = "I" + String(newNumber).padStart(3, "0");
  return newId;
}

itemSave.addEventListener("click", function () {
  if (validateItemFields()) {
    var code = document.getElementById("item-code").value;
    var name = document.getElementById("item-name").value;
    var qty = document.getElementById("item-qty").value;
    var price = document.getElementById("item-price").value;
    var itemImageInput = document.getElementById("item-image").files[0];
    if (itemImageInput) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var itemImage = e.target.result;
        var item = {
          code: code,
          name: name,
          qty: qty,
          price: price,
          image: itemImage,
        };

        items.push(item);
        updateItemList();
        updateItemListInPlaceOrder();
        document.getElementById("item-code").value = generateItemId();
      };

      reader.readAsDataURL(itemImageInput);
    }
    clearFields();
  }
});

function updateItemList() {
  if (items.length === 0) {
    itemList.innerHTML = "<h1>All Items have been deleted.</h1>";
  } else {
    itemList.innerHTML = "";

    items.forEach(function (item) {
      var itemDiv = `
            <div class="card">
                <img src="${item.image}" alt="" />
                <h1>${item.code}</h1>
                <h1>${item.name}</h1>
                <h1>${item.price}</h1>
                <h1>${item.qty}pcs available</h1>
              </div>
            `;
      itemList.innerHTML += itemDiv;
    });
  }
}
// });

itemSearchBtn.addEventListener("click", function () {
  items.forEach(function (item) {
    if (itemSearchTxt.value === "" || itemSearchTxt.value === null) {
      updateItemList();
      clearFields();
      l;
    } else if (
      item.code === itemSearchTxt.value ||
      item.code === itemSearchTxt.value
    ) {
      document.getElementById("item-code").value = item.code;
      document.getElementById("item-name").value = item.name;
      document.getElementById("item-qty").value = item.qty;
      document.getElementById("item-price").value = item.price;
      itemList.innerHTML = "";
      var itemDiv = `
            <div class="card">
                <img src="${item.image}" alt="" />
                <h1>${item.code}</h1>
                <h1>${item.name}</h1>
                <h1>${item.price}</h1>
                <h1>${item.qty}pcs available</h1>
              </div>
            `;
      itemList.innerHTML = itemDiv;
    }
  });
});


let btnUpdateItem = document.getElementById("item-update");

btnUpdateItem.addEventListener("click", function () {
let itemCode=document.getElementById("item-code").value ;
let itemName=document.getElementById("item-name").value;
let itemQty=document.getElementById("item-qty").value;
let itemPrice=document.getElementById("item-price").value;
  var itemImageInput = document.getElementById("item-image").files[0];

  items.forEach(function (item) {
    if (item.code === itemCode) {
      item.name = itemName;
      item.qty = itemQty;
      item.price = itemPrice;
      if (itemImageInput) {
        var reader = new FileReader();

        reader.onload = function (e) {
        item.image = e.target.result;
          updateItemList();
          clearFields();
        };

        reader.readAsDataURL(itemImageInput);
      } else {
        updateItemList();
        clearFields();
      }
    }
  });
});

let btnDeleteItem = document.getElementById("item-delete");

btnDeleteItem.addEventListener("click", function () {
  let itemCode = document.getElementById("item-code").value;
  items.forEach(function (item, index) {
    if (item.code === itemCode) {
      items.splice(index, 1);
      updateItemList();
      clearFields();
    }
  });
});

function validateItemFields() {
  var code = document.getElementById("item-code").value.trim();
  var name = document.getElementById("item-name").value.trim();
  var qty = document.getElementById("item-qty").value.trim();
  var price = document.getElementById("item-price").value.trim();
  var itemImageInput = document.getElementById("item-image").files[0];

  // Regex patterns
  var codePattern = /^[a-zA-Z0-9]+$/;
  var namePattern = /^[a-zA-Z\s]+$/;
  var qtyPattern = /^\d+$/;
  var pricePattern = /^\d+(\.\d{1,2})?$/;

  // Validate code (must be alphanumeric)
  if (!codePattern.test(code)) {
    alert("Please enter a valid code (alphanumeric characters only).");
    return false;
  }

  // Validate name (must contain only letters and spaces)
  if (!namePattern.test(name)) {
    alert("Please enter a valid name (letters and spaces only).");
    return false;
  }

  // Validate quantity (must be a positive integer)
  if (!qtyPattern.test(qty) || Number(qty) <= 0) {
    alert("Please enter a valid quantity (positive number).");
    return false;
  }

  // Validate price (must be a positive number, integer or decimal)
  if (!pricePattern.test(price) || Number(price) <= 0) {
    alert("Please enter a valid price (positive number).");
    return false;
  }

  // Validate image (must be uploaded)
  if (!itemImageInput) {
    alert("Item image is required.");
    return false;
  }

  // If all validations pass
  return true;
}

function clearFields() {
  document.getElementById("item-code").value = generateItemId();
  document.getElementById("item-name").value = "";
  document.getElementById("item-qty").value = "";
  document.getElementById("item-price").value = "";
  document.getElementById("item-image").value = "";
}
