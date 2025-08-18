const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "public")));

app.post("/todos", (req, res) => {
    let title = req.body.title;
    console.log(title);
    res.json({
        success: true,
        message: "todo added successfully"
    });
});

app.listen(7778, () => {
    console.log("Server running on http://localhost:7778");
});
