let products = [
  {
    id: 1,
    name: "iphone 16",
    price: 100000
  },
  {
    id: 2,
    name: "samsung",
    price: 80000
  }
];

let balance = 100000;  

function buyProduct(productName, cb) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].name === productName) {
      return cb(null, products[i].price); // product found, return immediately
    }
  }
  // If loop ends without finding the product
  cb("No product found", null);
}

function pay(amount, cb) {
  if (balance >= amount) {
    balance -= amount;
    cb(null, "Payment successful. Remaining balance: " + balance);
  } else {
    cb("Insufficient balance", null);
  }
}

// Call the functions
buyProduct("iphone 16", function (err, price) {
  if (err) return console.log(err);
  console.log("Product found, price:", price);

  pay(price, function (err, successMsg) {
    if (err) return console.log(err);
    console.log(successMsg);
  });
});
