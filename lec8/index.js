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

function buyProduct(productName) {
  return new Promise((resolve, reject) => {
    const product = products.find(p => p.name === productName);
    if (product) {
      resolve(product.price);
    } else {
      reject("No product found");
    }
  });
}

function pay(amount) {
  return new Promise((resolve, reject) => {
    if (balance >= amount) {
      balance -= amount;
      resolve("Payment successful. Remaining balance: " + balance);
    } else {
      reject("Insufficient balance");
    }
  });
}
buyProduct("iphone 16")
  .then(price => {
    console.log("Product found, price:", price);
    return pay(price); 
  })
  .then(successMsg => {
    console.log(successMsg);
  })
  .catch(err => {
    console.log("Error:", err);
  });
