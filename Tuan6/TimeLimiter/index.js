const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Hàm giới hạn thời gian thực thi
function timeoutPromise(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Quá thời gian cho phép')), ms)
    ),
  ]);
}

app.get('/timeout-call', async (req, res) => {
  const start = Date.now();

  try {
    const response = await timeoutPromise(
      axios.get('http://localhost:4000/service'),
      2000 // giới hạn 2 giây
    );

    const timeTaken = Date.now() - start;
    console.log(`✅ Thành công trong ${timeTaken}ms`);
    res.json({ message: 'OK', data: response.data, time: `${timeTaken}ms` });

  } catch (err) {
    const timeTaken = Date.now() - start;
    console.log(`⛔ Timeout sau ${timeTaken}ms: ${err.message}`);
    res.status(504).json({ error: 'Timeout', message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`⏳ Server Timeout Demo tại http://localhost:${PORT}`);
});
