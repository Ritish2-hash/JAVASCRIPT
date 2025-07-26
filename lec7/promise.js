let p = new Promise((resolve, reject) => {
  let age = 20; // you can change the age to test

  if (age >= 18) {
    resolve("You are allowed to vote.");
  } else {
    reject("You are NOT allowed to vote.");
  }
});
console.log(p)


p.then(message => {
  console.log("Success:", message);
}).catch(error => {
  console.log("Error:", error);
});



