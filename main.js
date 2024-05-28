var customerBtn=document.getElementById("customer")
var itemBtn=document.getElementById("item")
var placeOrderBtn = document.getElementById("place-order");
var customerPage = document.getElementById("customer-page");
var itemPage = document.getElementById("item-page");
var placeOrderPage = document.getElementById("place-order-page");
    
    
    customerBtn.addEventListener("click", function () {
      customerPage.style.zIndex = "3";
      itemPage.style.zIndex = "2";
      placeOrderPage.style.zIndex = "1";
    });

    itemBtn.addEventListener("click", function () {
      customerPage.style.zIndex = "1";
      itemPage.style.zIndex = "3";
      placeOrderPage.style.zIndex = "2";
    });

    placeOrderBtn.addEventListener("click", function () {
      customerPage.style.zIndex = "1";
      itemPage.style.zIndex = "2";
      placeOrderPage.style.zIndex = "3";
    });


var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
        loader.style.display="none"
    })