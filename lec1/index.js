console.log("hello, world");

function delay() {
    let currtime = new Date().getTime();
    while (new Date().getTime() - currtime < 4000) {
        // blocking for 4 seconds
    }
    console.log("delay done");
}

// delay
setTimeout(delay, 0); // non-blocking call
console.log("bbye");

function sum(a, b) {
    console.log(a + b);
}
sum(2, 3);
sum(5, 6);
sum(6, 7);

console.log("hnji");

// function that returns a promise to multiply two numbers if a > 10
function mul(a, b) {
    return new Promise((resolve, reject) => {
        if (a > 10) {
            resolve(a * b);
        } else {
            reject("a is less than or equal to 10");
        }
    });
}

// call mul with a > 10
mul(12, 5)
    .then((data) => {
        console.log(data);
    })
    .catch(err => {
        console.log(data);
    });


