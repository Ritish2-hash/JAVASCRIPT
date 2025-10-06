const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const blogForm = document.getElementById("blogForm");
const getAllBlogsBtn = document.getElementById("getAllBlogs");
const getMyBlogsBtn = document.getElementById("getMyBlogs");
const blogsDiv = document.getElementById("blogs");


signupForm.addEventListener("submit", async e => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  alert(data.message);
});


loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (data.success) {
    localStorage.setItem("token", data.token); // save token in browser
    alert("Login success!");
  } else {
    alert(data.message);
  }
});

// Add Blog
blogForm.addEventListener("submit", async e => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const token = localStorage.getItem("token"); // get token from localStorage

  const res = await fetch("/api/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  });

  const data = await res.json();
  alert(data.message);
});

// Get All Blogs
getAllBlogsBtn.addEventListener("click", async () => {
  const res = await fetch("/api/blogs");
  const data = await res.json();

  blogsDiv.innerHTML = "<h3>All Blogs</h3>";
  data.data.forEach(blog => {
    blogsDiv.innerHTML += `<p><b>${blog.title}</b> - ${blog.content} (by ${blog.userId?.username || "Unknown"})</p>`;
  });
});

// Get My Blogs
getMyBlogsBtn.addEventListener("click", async () => {
  const token = localStorage.getItem("token"); // get token from localStorage

  const res = await fetch("/api/blogs/myblogs", {
    headers: { "Authorization": `Bearer ${token}` }
  });

  const data = await res.json();

  blogsDiv.innerHTML = "<h3>My Blogs</h3>";
  data.data.forEach(blog => {
    blogsDiv.innerHTML += `<p><b>${blog.title}</b> - ${blog.content}</p>`;
  });
});
