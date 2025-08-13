const signupBtn = document.getElementById("signup-btn");
const signupForm = document.getElementById("signup-form");

signupBtn.addEventListener("click", () => {
    // Toggle form visibility
    if (signupForm.style.display === "none" || signupForm.style.display === "") {
        signupForm.style.display = "block";
        signupBtn.textContent = "Close Form";
    } else {
        signupForm.style.display = "none";
        signupBtn.textContent = "Sign Up";
    }
});
