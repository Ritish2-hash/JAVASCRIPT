let myBlogsList = document.querySelector("#my-blogs-list");
let userToken = localStorage.getItem('token');

async function loadMyBlogs() {
    if (!userToken) {
        myBlogsList.innerHTML = '<p>Please login to view your blogs. <a href="index.html">Go to Login</a></p>';
        return;
    }

    try {
        let response = await fetch("/api/myblog", {
            headers: {
                "Authorization": userToken
            }
        });
        let data = await response.json();
        
        if (data.success && data.data.length > 0) {
            let blogsHTML = '';
            data.data.forEach(blog => {
                blogsHTML += `
                    <div class="blog-card">
                        <h3>${blog.title}</h3>
                        <p>${blog.body}</p>
                        <small>Posted on: ${new Date(blog.date).toLocaleDateString()}</small>
                        <br><button class="delete-btn" onclick="deleteBlog('${blog._id}')">Delete</button>
                    </div>
                `;
            });
            myBlogsList.innerHTML = blogsHTML;
        } else {
            myBlogsList.innerHTML = '<p>You haven\'t written any blogs yet. <a href="index.html">Write your first blog</a></p>';
        }
    } catch (error) {
        myBlogsList.innerHTML = '<p>Error loading your blogs.</p>';
    }
}

async function deleteBlog(blogId) {
    if (!confirm('Are you sure you want to delete this blog?')) {
        return;
    }
    
    try {
        let response = await fetch("/api/blogs/" + blogId, {
            method: "DELETE",
            headers: {
                "Authorization": userToken
            }
        });
        
        let data = await response.json();
        
        if (data.success) {
            alert("Blog deleted successfully");
            loadMyBlogs();
        } else {
            alert("Delete failed: " + data.message);
        }
    } catch (error) {
        alert("Error deleting blog");
    }
}

function logout() {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    window.location.href = 'index.html';
}

loadMyBlogs();