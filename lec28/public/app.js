// Get signup form elements
let signupForm = document.querySelector("#signup-form");
let signupUsername = document.querySelector("#signup-username");
let signupEmail = document.querySelector("#signup-email");
let signupPassword = document.querySelector("#signup-password");

// Get login form elements
let loginForm = document.querySelector("#login-form");
let loginEmail = document.querySelector("#login-email");
let loginPassword = document.querySelector("#login-password");

// Get blog form elements
let blogForm = document.querySelector("#blog-form");
let blogTitle = document.querySelector("#blog-title");
let blogBody = document.querySelector("#blog-body");

// Get other elements
let blogsList = document.querySelector("#blogs-list");
let addBlogDiv = document.querySelector("#addblog");
let logoutBtn = document.querySelector("#logout-btn");

// Store user token
let userToken = localStorage.getItem('token');

// Update UI based on login
function updateUI() {
    let isLoggedIn = userToken !== null;
    addBlogDiv.style.display = isLoggedIn ? 'block' : 'none';
    logoutBtn.style.display = isLoggedIn ? 'block' : 'none';
}

// Handle signup form
signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    
    let usernameValue = signupUsername.value;
    let emailValue = signupEmail.value;
    let passwordValue = signupPassword.value;

    let response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username: usernameValue,
            email: emailValue,
            password: passwordValue
        }),
        headers: {  
            "Content-Type": "application/json"
        }
    });

    let data = await response.json();
    
    if (data.success) {
        alert("Signup successful");
        signupForm.reset();
    } else {
        alert("Signup failed: " + data.message);
    }
});

// Handle login form
loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    let emailValue = loginEmail.value;
    let passwordValue = loginPassword.value;

    let response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    let data = await response.json();
    
    if (data.success) {
        alert("Login successful");
        userToken = data.token;
        localStorage.setItem('token', userToken);
        updateUI();
        loadAllBlogs();
    } else {
        alert("Login failed: " + data.message);
    }
});

// Handle blog form
blogForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    let titleValue = blogTitle.value;
    let bodyValue = blogBody.value;

    let response = await fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify({
            title: titleValue,
            body: bodyValue
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": userToken
        }
    });

    let data = await response.json();
    
    if (data.success) {
        alert("Blog published successfully");
        blogForm.reset();
        loadAllBlogs();
    } else {
        alert("Blog publish failed: " + data.message);
    }
});

// Load all blogs
async function loadAllBlogs() {
    let response = await fetch("/api/blogs");
    let data = await response.json();
    
    if (data.success && data.data.length > 0) {
        let blogsHTML = '';
        data.data.forEach(blog => {
            blogsHTML += `
                <div class="blog-card">
                    <h3>${blog.title}</h3>
                    <p>${blog.body}</p>
                    <small>Posted on: ${new Date(blog.date).toLocaleDateString()}</small>
                    ${userToken ? `<br><button class="delete-btn" onclick="deleteBlog('${blog._id}')">Delete</button>` : ''}
                </div>
            `;
        });
        blogsList.innerHTML = blogsHTML;
    } else {
        blogsList.innerHTML = '<p>No blogs found. Be the first to write one!</p>';
    }
}

// Delete blog
async function deleteBlog(blogId) {
    if (!confirm('Are you sure you want to delete this blog?')) {
        return;
    }
    
    let response = await fetch("/api/blogs/" + blogId, {
        method: "DELETE",
        headers: {
            "Authorization": userToken
        }
    });
    
    let data = await response.json();
    
    if (data.success) {
        alert("Blog deleted successfully");
        loadAllBlogs();
    } else {
        alert("Delete failed: " + data.message);
    }
}

// Logout function
function logout() {
    userToken = null;
    localStorage.removeItem('token');
    updateUI();
    alert('Logged out successfully');
}

// Initialize page
updateUI();
loadAllBlogs();