// app.js
const express = require('express');
const app = express();
const port = 3000;

const receiptsRoutes = require('./routes/receiptsRoutes');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/receipts', receiptsRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

