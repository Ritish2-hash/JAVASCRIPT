const express = require('express');
const app = express();
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
  res.sendFile(__dirname + "/index.html");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
