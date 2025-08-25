const express = require("express");
const app = express();
const mongoose = require("mongoose");
const BlogModel = require("./model/blogs"); //IMPORT Model
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err.message));

app.use(express.static(__dirname + "/public"));

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "server running ok"
  });
});

app.listen(3323, () => {
  console.log("server started");
});


// function addBlog(blogData) {
//   let newBlog = new BlogModel(blogData);
//   newBlog.save()
//     .then(() => console.log("Blog added successfully:", blogData.title))
//     .catch(err => console.log(err));
// }

// // add first blog
// addBlog({
//   title: "first blog",
//   author: "ritish",
//   body: "first blog content",
//   date: new Date()
// });

// // add second blog
// addBlog({
//   title: "second blog",
//   author: "ritish",
//   body: "second blog content",
//   date: new Date()
// });

// //delete data from collection

// async function deleteBlog() {
//   try {
//     const result = await BlogModel.deleteOne({ _id: "68a69b7e2f6496bf6ea550bc" });
//     if (result.deletedCount > 0) {
//       console.log("Blog deleted successfully");
//     } else {
//       console.log("No blog found with this ID");
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// deleteBlog();

// async function findBlog() {
//   try {
//     // find the first blog with title = "first blog"
//     const blog = await BlogModel.findOne({ title: "first blog" });

//     if (blog) {
//       console.log("Blog found:", blog);
//     } else {
//       console.log("No blog found with this title");
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// findBlog();

// async function findBlogs() {
//   try {
//     // Find all blogs by author "ritish"
//     const blogs = await BlogModel.find({ author: "ritish" });

//     if (blogs.length > 0) {
//       console.log("Blogs found:", blogs);
//     } else {
//       console.log("No blogs found");
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// findBlogs();

// async function readAllBlogs() {
//   try {
//     const blogs = await BlogModel.find(); // fetch all blogs

//     if (blogs.length > 0) {
//       console.log("All Blogs:", blogs);
//     } else {
//       console.log("No blogs found in the collection");
//     }
//   } catch (error) {
//     console.log("Error reading blogs:", error.message);
//   }
// }

// readAllBlogs();


// async function updateBlogs() {
//   try {
//     const result = await BlogModel.updateMany(
//       { author: "ritish garg" },              // filter
//       { $set: { author: "ritish" } } // update
//     );

//     console.log("Update Result:", result);
//   } catch (error) {
//     console.log("Error updating blogs:", error.message);
//   }
// }

// updateBlogs();

// app.get("/readAllusers", async (req, res) => {
//   try {
//     let allblogs = await BlogModel.find();
//     res.json({
//       success: true,
//       data: allblogs
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: "Error fetching users",
//       error: error.message
//     });
//   }
// });


app.post("/addblogs", async (req, res) => {
  try {
    const { title, content } = req.body;

    await BlogModel.create({
      title: title,
      content: content
    });

    res.json({
      success: true,
      message: "blog added successfully"
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "something went wrong",
      error: error.message
    });
  }
});




app.put("/updateblog/:id", async (req, res) => {
  try {
    await BlogModel.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title, body: req.body.body } }
    );

    res.json({ success: true, message: "blog updated" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});


app.delete("/deleteblog/:id", async (req, res) => {
  try {
    await BlogModel.deleteOne({ _id: req.params.id });

    res.json({ success: true, message: "blog deleted" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});