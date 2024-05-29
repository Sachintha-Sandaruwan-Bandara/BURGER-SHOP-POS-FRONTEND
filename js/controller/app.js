var customerBtn = document.getElementById("customer");
var itemBtn = document.getElementById("item");
var placeOrderBtn = document.getElementById("place-order");
var customerPage = document.getElementById("customer-page");
var itemPage = document.getElementById("item-page");
var placeOrderPage = document.getElementById("place-order-page");
var icon1 = document.getElementById("icon1");
var icon2 = document.getElementById("icon2");
var icon3 = document.getElementById("icon3");

customerBtn.addEventListener("click", function () {
  customerPage.style.zIndex = "3";
  itemPage.style.zIndex = "2";
  placeOrderPage.style.zIndex = "1";
  customerBtn.classList.add("iconClick");
  icon1.classList.add("ic");
  itemBtn.classList.remove("iconClick");
  icon2.classList.remove("ic");
  placeOrderBtn.classList.remove("iconClick");
  icon3.classList.remove("ic");
});

itemBtn.addEventListener("click", function () {
  customerPage.style.zIndex = "1";
  itemPage.style.zIndex = "3";
  placeOrderPage.style.zIndex = "2";
  itemBtn.classList.add("iconClick");
  icon2.classList.add("ic");
  customerBtn.classList.remove("iconClick");
  icon1.classList.remove("ic");
  placeOrderBtn.classList.remove("iconClick");
  icon3.classList.remove("ic");
});

placeOrderBtn.addEventListener("click", function () {
  customerPage.style.zIndex = "1";
  itemPage.style.zIndex = "2";
  placeOrderPage.style.zIndex = "3";
  placeOrderBtn.classList.add("iconClick");
  icon3.classList.add("ic");
  customerBtn.classList.remove("iconClick");
  icon1.classList.remove("ic");
  itemBtn.classList.remove("iconClick");
  icon2.classList.remove("ic");
});

var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});
