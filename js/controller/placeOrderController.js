import { items } from "../db/db.js";
document.addEventListener("DOMContentLoaded", function () {
  var itemList = document.getElementById("place-order-cards");
    updateItemList();

function updateItemList() {
  if (items.length === 0) {
    itemList.innerHTML = "<h1>NO AVAILABLE FODDS</h1>";
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
                <button class="add">addToCart</button>
              </div>
            `;
      itemList.innerHTML += itemDiv;
    });
  }
}
});