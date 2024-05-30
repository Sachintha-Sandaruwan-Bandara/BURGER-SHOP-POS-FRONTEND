import { items, orderList } from "../db/db.js";

document.addEventListener("DOMContentLoaded", function () {
  var itemList = document.getElementById("place-order-cards");

  updateItemList();

  function updateItemList() {
    if (items.length === 0) {
      itemList.innerHTML = "<h1>NO AVAILABLE FOODS</h1>";
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
                <button id="${item.code}" class="add">Add to Cart</button>
              </div>
            `;
        itemList.innerHTML += itemDiv;
      });
      var addToCartButtons = document.querySelectorAll(".add");
      addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          var itemCode = button.id;
          addToCart(itemCode);
        });
      });
    }
  }

  function addToCart(itemCode) {
    console.log("Item added to cart:", itemCode);
    var selectedItem = items.find((item) => item.code === itemCode);
    if (selectedItem) {
      var order = {
        id:selectedItem.code,
        name: selectedItem.name,
        price: selectedItem.price,
        qty: 1,
      };
      orderList.push(order);
      console.log("Order List:", orderList);
      updateOrderList();
    }
  }

  function updateOrderList() {
    var cart = document.getElementById("order-item-list");
    if (orderList.length === 0) {
      cart.innerHTML = "<h1>Cart is empty.</h1>";
    } else {
      cart.innerHTML = "";

      orderList.forEach(function (order) {
        var orderCard = `
               <div class="order-item-card">
                  <h1>${order.name}</h1>
                  <div class="price-qty">
                    <h1>${order.price}</h1>
                    <div class="btn-wrapper">
                      <button class="qty-btn">
                        <i id="${order.id}" class="minus fa-solid fa-minus"></i>
                        <div>${order.qty}</div>
                        <i id="${order.id}" class="plus fa-solid fa-plus"></i>
                      </button>
                      <i id="${order.name}" class="trash fa-solid fa-trash-can"></i>
                    </div>
                  </div>
                  <input placeholder="    Not Spicy" type="text" />
                </div>
            `;
        cart.innerHTML += orderCard;
      });
      var deleteButtons = document.querySelectorAll(".trash");
      deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          var itemName = button.id;
          deleteItemFromOrder(itemName);
        });
      });

            var minusButtons = document.querySelectorAll(".minus");
            minusButtons.forEach(function (button) {
              button.addEventListener("click", function () {
              
                orderList.forEach(function (order) {
                  if (button.id === order.id) {
                    if (order.qty != 0) {
                      order.qty -= 1;
                      updateOrderList();
                    }
                   
                  }
                })

              });
            });
      
                  var plusButtons = document.querySelectorAll(".plus");
                  plusButtons.forEach(function (button) {
                    button.addEventListener("click", function () {
                      
                      orderList.forEach(function (order) {
                        if (button.id === order.id) {
                          itemList.forEach(function () {
                            
                          })

                            order.qty += 1;
                            updateOrderList();
                          
                        }
                      });
                    });
                  });
    }
  }

  function deleteItemFromOrder(itemName) {
    var index = orderList.findIndex((order) => order.name === itemName);
    if (index !== -1) {
   
      orderList.splice(index, 1);
      updateOrderList();
    }
  }



});
