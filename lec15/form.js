const form = document.querySelector(".signup-form");
const titleInput = document.querySelector("#name"); // Select the input field
const body = document.body;

console.log(form);
console.log(titleInput);

form.addEventListener("submit", function(ev) {
    ev.preventDefault(); 

    let title = titleInput.value;
    console.log(title);
});

body.addEventListener("click", function(ev) { 
    console.log(ev.target);
});

// Example: Key press event
document.addEventListener("keydown", function(ev) {
    console.log("Key pressed:", ev.key);
});
