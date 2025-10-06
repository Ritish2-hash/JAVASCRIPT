let allBlogsList = document.querySelector("#all-blogs-list");

async function loadAllBlogs() {
    try {
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
                    </div>
                `;
            });
            allBlogsList.innerHTML = blogsHTML;
        } else {
            allBlogsList.innerHTML = '<p>No blogs found.</p>';
        }
    } catch (error) {
        allBlogsList.innerHTML = '<p>Error loading blogs.</p>';
    }
}

loadAllBlogs();