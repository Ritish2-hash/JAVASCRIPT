const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form POST request
app.post("/users", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userData = `Username: ${username}, Password: ${password}\n`;

  // Append to file
  fs.appendFile('users.txt', userData, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.send("Something went wrong while saving data.");
    } else {
      console.log("User data saved to users.txt");
      res.send("Signup successful and data stored.");
    }
  });
});

// Retrieve user data by index
app.get("/user/:index", (req, res) => {
  const index = parseInt(req.params.index);

  fs.readFile('users.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.send("Error reading user data.");
    }

    const lines = data.trim().split('\n');

    if (index < 0 || index >= lines.length) {
      return res.send("Invalid index.");
    }

    const userLine = lines[index];
    res.send(`User at index ${index}: ${userLine}`);
  });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
