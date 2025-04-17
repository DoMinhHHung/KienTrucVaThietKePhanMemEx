const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

async function retryCall(maxTries = 5, interval = 3000) {
  console.log('🔁 [START] Bắt đầu thử gửi đến Service02...\n');

  for (let i = 1; i <= maxTries; i++) {
    console.log(`🚀 [Lần ${i}/${maxTries}] Gửi request đến http://localhost:4000/service ...`);
    const timestamp = new Date().toLocaleTimeString();

    try {
      const res = await axios.get('http://localhost:4000/service', { timeout: 2000 });
      console.log(`✅ [${timestamp}] Service phản hồi:`, res.data);
      console.log(`🏁 [DONE] Kết thúc retry sớm tại lần ${i}\n`);
      return res.data;
    } catch (err) {
      console.log(`❌ [${timestamp}] Không nhận được phản hồi (Service có thể đang STOP)`);
    }

    if (i < maxTries) {
      console.log(`⏳ Đợi ${interval / 1000} giây trước khi thử lại...\n`);
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }

  console.log(`🛑 [END] Hết ${maxTries} lần thử. Không kết nối được Service02.\n`);
  return { message: 'Failed after retries' };
}

app.get('/pm-call', async (req, res) => {
  const result = await retryCall();
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`📡 Controller01 đang chạy tại http://localhost:${PORT}`);
});
