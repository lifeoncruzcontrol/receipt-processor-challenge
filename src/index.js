// app.js
const express = require('express');
const Database = require('./database');
const app = express();
const port = 3000;

const db = new Database();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

