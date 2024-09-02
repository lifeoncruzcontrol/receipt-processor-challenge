// app.js
const express = require('express');
const app = express();
const port = 3000;

const receiptsRoutes = require('./routes/receiptsRoutes');
const validateReceipt = require('./middleware/receipts.middleware');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/receipts', validateReceipt, receiptsRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

