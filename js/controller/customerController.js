import { customers } from "../db/db.js";
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("customer-id").value = generateCustomerId();
});
var btnSave = document.getElementById("customer-save");
var customerList = document.getElementById("customer-cards");
var customerSearchTxt = document.getElementById("txt-customer-search");
var customerSearchBtn = document.getElementById("btn-customer-search");
var btnGetAll = document.getElementById("btn-get-all");

//for preloaded customer
updateCustomerList();

function generateCustomerId() {
  // Extract numeric part of customer IDs
  var customerNumbers = customers.map((customer) => {
    return parseInt(customer.id.replace("C", ""), 10);
  });

  // Find the highest number and increment it
  var maxNumber = customerNumbers.length > 0 ? Math.max(...customerNumbers) : 0;
  var newNumber = maxNumber + 1;

  // Pad the number with leading zeros
  var newId = "C" + String(newNumber).padStart(3, "0");
  return newId;
}

btnSave.addEventListener("click", function () {
  if (validateFields()) {
    var id = document.getElementById("customer-id").value;

    var name = document.getElementById("customer-name").value;
    var address = document.getElementById("customer-address").value;
    var salary = document.getElementById("customer-salary").value;
    var customerImageInput = document.getElementById("customer-image").files[0];

    if (customerImageInput) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var customerImage = e.target.result;
        var customer = {
          id: id,
          name: name,
          address: address,
          salary: salary,
          image: customerImage,
        };
        console.log(customer.id);
        customers.push(customer);
        updateCustomerList();
        clearFields();
      };

      reader.readAsDataURL(customerImageInput);
    }
  }
});

function updateCustomerList() {
  if (customers.length === 0) {
    customerList.innerHTML = "<h1>All customers have been deleted.</h1>";
  } else {
    customerList.innerHTML = "";

    customers.forEach(function (customer) {
      var customerDiv = `
               <div class="card">
                <img  src="${customer.image}" alt="" />
                <h1 > ${customer.id}</h1>
                <h1 > ${customer.name}</h1>
                <h1 > ${customer.address}</h1>
                <h1 > ${customer.salary}</h1>
              </div>
            `;
      customerList.innerHTML += customerDiv;
    });
  }
}

customerSearchBtn.addEventListener("click", function () {
  customers.forEach(function (customer) {
    if (customerSearchTxt.value === "" || customerSearchTxt.value === null) {
      updateCustomerList();
      l;
    } else if (
      customer.id === customerSearchTxt.value ||
      customer.name === customerSearchTxt.value
    ) {
      document.getElementById("customer-id").value = customer.id;
      document.getElementById("customer-name").value = customer.name;
      document.getElementById("customer-address").value = customer.address;
      document.getElementById("customer-salary").value = customer.salary;

      customerList.innerHTML = "";
      var customerDiv = `
               <div class="card">
                <img  src="${customer.image}" alt="" />
                <h1 > ${customer.id}</h1>
                <h1 > ${customer.name}</h1>
                <h1 > ${customer.address}</h1>
                <h1 > ${customer.salary}</h1>
              </div>
            `;
      customerList.innerHTML = customerDiv;
    }
  });
});

let btnUpdateCustomer = document.getElementById("customer-update");

btnUpdateCustomer.addEventListener("click", function () {
  let id = document.getElementById("customer-id").value;
  let name = document.getElementById("customer-name").value;
  let address = document.getElementById("customer-address").value;
  let salary = document.getElementById("customer-salary").value;
  var customerImageInput = document.getElementById("customer-image").files[0];

  customers.forEach(function (customer) {
    if (customer.id === id) {
      customer.name = name;
      customer.address = address;
      customer.salary = salary;
      if (customerImageInput) {
        var reader = new FileReader();

        reader.onload = function (e) {
          customer.image = e.target.result;
          updateCustomerList();
          clearFields();
        };

        reader.readAsDataURL(customerImageInput);
      } else {
        updateCustomerList();
        clearFields();
      }
    }
  });
});

let btnDeleteCustomer = document.getElementById("customer-delete");

btnDeleteCustomer.addEventListener("click", function () {
  let id = document.getElementById("customer-id").value;
  customers.forEach(function (customer,index) {
 if (customer.id === id) {
   customers.splice(index, 1);
   updateCustomerList();
   clearFields();
 }
  });
});

// btnGetAll.addEventListener("click", function () {
//   updateCustomerList();
// });
// });

// validation

function validateFields() {
  var id = document.getElementById("customer-id").value.trim();
  var name = document.getElementById("customer-name").value.trim();
  var address = document.getElementById("customer-address").value.trim();
  var salary = document.getElementById("customer-salary").value.trim();
  var customerImageInput = document.getElementById("customer-image").files[0];

  // Regex patterns
  var idPattern = /^[a-zA-Z0-9]+$/;
  var namePattern = /^[a-zA-Z\s]+$/;
  var addressPattern = /^[a-zA-Z0-9\s,.'-]+$/;
  var salaryPattern = /^\d+(\.\d{1,2})?$/;

  // Validate ID (must be alphanumeric)
  if (!idPattern.test(id)) {
    alert("Please enter a valid ID (alphanumeric characters only).");
    return false;
  }

  // Validate name (must contain only letters and spaces)
  if (!namePattern.test(name)) {
    alert("Please enter a valid name (letters and spaces only).");
    return false;
  }

  // Validate address (can contain letters, numbers, spaces, and common punctuation)
  if (!addressPattern.test(address)) {
    alert("Please enter a valid address.");
    return false;
  }

  // Validate salary (must be a positive number, integer or decimal)
  if (!salaryPattern.test(salary) || Number(salary) <= 0) {
    alert("Please enter a valid salary (positive number).");
    return false;
  }

  // Validate image (must be uploaded)
  if (!customerImageInput) {
    alert("customer image is required.");
    return false;
  }

  // If all validations pass
  return true;
}

function clearFields() {
  document.getElementById("customer-id").value = "";
  document.getElementById("customer-id").value = generateCustomerId();
  document.getElementById("customer-name").value = "";
  document.getElementById("customer-address").value = "";
  document.getElementById("customer-salary").value = "";
  document.getElementById("customer-image").value = "";
}
