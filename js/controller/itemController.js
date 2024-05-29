import { items } from "../db/db.js";
document.addEventListener("DOMContentLoaded", function () {
  var itemSave = document.getElementById("item-save");
  var itemList = document.getElementById("item-cards");

  //for preloaded customer
  updateItemList();

    itemSave.addEventListener("click", function () {

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
      };

      reader.readAsDataURL(itemImageInput);
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
});
