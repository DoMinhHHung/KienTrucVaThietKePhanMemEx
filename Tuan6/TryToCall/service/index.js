const express = require('express');
const app = express();

let isRunning = false;

app.get('/toggle', (req, res) => {
  isRunning = !isRunning;
  res.send({ status: isRunning ? 'STARTED' : 'STOPPED' });
});

app.get('/service', (req, res) => {
  if (!isRunning) {
    res.status(503).send({ message: 'Service UNAVAILABLE' });
  } else {
    res.send({ message: '✅ Service is running!' });
  }
});

app.listen(4000, () => console.log('🟢 Service02 chạy tại http://localhost:4000'));
