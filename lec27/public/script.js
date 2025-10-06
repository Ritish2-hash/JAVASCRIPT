let signupForm = document.querySelector("#signup-form");
let signupusername = document.querySelector("#signup-username");
let signupemail = document.querySelector("#signup-email");
let signuppassword = document.querySelector("#signup-password");

signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let response = await fetch("/api/users/signup", {
    method: "POST",
    body: JSON.stringify({
      username: signupusername.value,
      email: signupemail.value,
      password: signuppassword.value
    }),
    headers: { "Content-Type": "application/json" }
  });

  let data = await response.json();
  alert(data.message);
});

let loginForm = document.querySelector("#login-form");
let loginusername = document.querySelector("#login-username");
let loginpassword = document.querySelector("#login-password");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: loginusername.value,
      password: loginpassword.value
    }),
    headers: { "Content-Type": "application/json" }
  });

  let data = await response.json();
  alert(data.message);
});
