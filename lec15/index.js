let changecolorbtn = document.querySelector(".form-button");
let stopbtn = document.querySelector(".stop-button");
let body = document.querySelector("body");

let colors = [
    "green", "blue", "red", "black", "white",
    "purple", "grey", "yellow", "orange", "lime"
];

let intervalId = null;

// Start changing colors automatically
function startChanging() {
    if (!intervalId) {
        intervalId = setInterval(changecolor, 1000);
    }
}

// Stop changing colors
function stopChanging() {
    clearInterval(intervalId);
    intervalId = null;
}

// Change to a random color
function changecolor() {
    let i = Math.floor(Math.random() * colors.length);
    body.style.background = colors[i];
}

// Event listeners
changecolorbtn.addEventListener("click", startChanging);
stopbtn.addEventListener("click", stopChanging);

// Start on page load
startChanging();
