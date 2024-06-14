import { items, orderList ,purchaseOrderList,customers} from "../db/db.js";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("order-id").innerText = generateOrderId();

  document.getElementById("date").innerText=getCurrentFormattedDate();
});
var itemList = document.getElementById("place-order-cards");
let discountField = document.getElementById("txt-discount");


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
  if (selectedItem.qty !== 0) {
    var existingOrder = orderList.find((order) => order.id === itemCode);
    if (existingOrder) {
      existingOrder.qty += 1;
    } else {
      var order = {
        id: selectedItem.code,
        name: selectedItem.name,
        price: selectedItem.price,
        qty: 1,
      };
      orderList.push(order);
    }
    selectedItem.qty -= 1;
    updateOrderList();
    updateItemList();
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
      updateTotal(discountField.value);
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
        var orderId = button.id;
        var order = orderList.find((order) => order.id === orderId);
        var Item = items.find((item) => item.code === orderId);

        if (order && order.qty > 0) {
          order.qty -= 1;
          if (order.qty === 0) {
            var selectedItem = items.find((item) => item.code === orderId);
            selectedItem.qty += 1;
            deleteItemFromOrder(order.name);
          } else {
            var item = items.find((item) => item.code === orderId);
            if (item) {
              item.qty += 1;
            }
            updateOrderList();
            updateItemList();
            updateTotal(discountField.value);
          }
        }
      });
    });

    var plusButtons = document.querySelectorAll(".plus");
    plusButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var orderId = button.id;
        var order = orderList.find((order) => order.id === orderId);
        var item = items.find((item) => item.code === orderId);
        if (order && item && item.qty > 0 && item.qty != 0) {
          order.qty += 1;
          item.qty -= 1;
          updateOrderList();
          updateItemList();
          updateTotal(discountField.value);
        }
      });
    });
  }
}

function deleteItemFromOrder(itemName) {
  var index = orderList.findIndex((order) => order.name === itemName);
  if (index !== -1) {
    var order = orderList[index];
    var item = items.find((item) => item.code === order.id);
    if (item) {
      item.qty += order.qty;
    }
    orderList.splice(index, 1);
    updateOrderList();
    updateItemList();
    updateTotal(discountField.value);
  }
}

export function updateItemListInPlaceOrder(params) {
  updateItemList();
}

let subTotal = document.getElementById("sub-total");
let total = document.getElementById("total");


function updateTotal(discountPercentage) {
  let subTotalValue = 0;

  orderList.forEach(function (order) {
    let price = parseFloat(order.price);
    let qty = parseFloat(order.qty);

    let tot = price * qty;

    subTotalValue += tot;
  });


  let discountAmount = subTotalValue * (discountPercentage / 100);

  
  let final = subTotalValue - discountAmount;

 
  subTotal.textContent = subTotalValue.toFixed(2);
  total.textContent = final.toFixed(2);
}


discountField.addEventListener("input", function () {
  updateTotal(discountField.value);
});

// });
let btnPay = document.getElementById("btn-pay");




function generateOrderId() {
  if (purchaseOrderList.length === 0) {
    return "#001";
  } else {
    let lastOrderId = purchaseOrderList[purchaseOrderList.length - 1].id;
    let nextOrderId = parseInt(lastOrderId.substring(1)) + 1;
    return `#${String(nextOrderId).padStart(3, "0")}`;
  }
}

btnPay.addEventListener("click", function () {
  let customerId = document.getElementById("customer-id-field").value;
  if (customerId == null && customerId !== "") {
    console.log("customer is not valid");
  } else {
    //copy cart to new array for empty cart after added to bill
    let cart = orderList.slice();
    customers.forEach(function (customer) {
      if (customerId === customer.id) {
        var purchasedOrder = {
          id: generateOrderId(),
          customer: customer,
          bill: cart,
          total: total.textContent,
        };
        // console.log("purchased list: ", purchaseOrderList);
        // console.log("cartList: ", orderList);
        purchaseOrderList.push(purchasedOrder);
        // clear cart 
        orderList.length = 0;
        updateOrderList();
        updateTotal(0);
        // console.log("purchased list: ", purchaseOrderList);
        // console.log("cartList: ", orderList);

        //for new order id
         document.getElementById("order-id").innerText = generateOrderId();

      }
    });
  }
});

function getCurrentFormattedDate() {

  let today = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


  let dayOfWeek = days[today.getDay()];
  let dayOfMonth = today.getDate();
  let month = months[today.getMonth()];
  let year = today.getFullYear();

 
  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
}