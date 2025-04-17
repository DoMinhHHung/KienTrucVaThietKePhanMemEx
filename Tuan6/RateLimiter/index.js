const express = require('express');
const axios = require('axios');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const app = express();
const PORT = 3000;

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

app.get('/call-service02', async (req, res) => {
  const time = new Date().toLocaleTimeString();

  try {
    await rateLimiter.consume('client');
    console.log(`✅ [${time}] Gửi request đến Service02`);

    const response = await axios.get('http://localhost:4000/service');
    console.log(`🎯 [${time}] Phản hồi từ Service02:`, response.data);

    res.json({ message: '✅ Thành công', data: response.data });
  } catch (err) {
    const waitTime = Math.ceil(err.msBeforeNext / 1000);
    console.log(`⛔ [${time}] Đã vượt giới hạn! Chờ ${waitTime}s`);

    res.status(429).json({
      message: `⚠️ Vượt giới hạn. Vui lòng thử lại sau ${waitTime} giây.`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`📡 Service 01 đang chạy tại http://localhost:${PORT}`);
});
