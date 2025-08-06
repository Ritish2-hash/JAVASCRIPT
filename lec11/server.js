const express = require('express');
const app = express();

const path = require('path');
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  res.send('User Page');
});

app.get('/blogs', (req, res) => {
  res.send(`
    <div>
      <h1>Welcome to My Blog</h1>
      <p>Read the latest articles on tech and life.</p>
      <p>Stay updated with fresh content every week.</p>
    </div>
  `);
});

app.get('/post', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/allusers', (req, res) => {
  let allusers = [
    { id: 1, name: "ritish" },
    { id: 2, name: "arsh" }
  ];
  res.json(allusers);
});

// ------------------------------------------------------------------
// PARAMS: e.g. http://localhost:3000/profile/1/ritish
app.get('/profile/:id/:name', (req, res) => {
  let id = req.params.id;
  let name = req.params.name;
  res.send("Profile ID: " + id + " | Username: " + name);
});

// Optional: Uncomment if you want query param version
// e.g. http://localhost:3000/profile?id=1&username=ritish
// app.get('/profile', (req, res) => {
//   let id = req.query.id;
//   let name = req.query.username;
//   res.send("Profile of ID: " + id + " | Username: " + name);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
