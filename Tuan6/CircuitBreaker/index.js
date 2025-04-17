const express = require('express');
const CircuitBreaker = require('opossum');

const app = express();
const PORT = 3000;

// Hàm giả lập dịch vụ gọi ra bên ngoài
function fakeService() {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    if (random < 0.5) {
      console.log('❌ fakeService thất bại');
      reject('Lỗi giả lập từ dịch vụ');
    } else {
      console.log('✅ fakeService thành công');
      resolve('Dịch vụ trả về thành công');
    }
  });
}

// Cấu hình Circuit Breaker
const options = {
  timeout: 3000, // thời gian chờ mỗi request (ms)
  errorThresholdPercentage: 50, // mở CB nếu lỗi > 50%
  resetTimeout: 5000, // thời gian CB ở trạng thái OPEN trước khi thử lại (ms)
};

const breaker = new CircuitBreaker(fakeService, options);

// Logging trạng thái chuyển đổi
breaker.on('open', () => console.log('🔴 CB OPEN - chặn request'));
breaker.on('halfOpen', () => console.log('🟡 CB HALF-OPEN - thử lại...'));
breaker.on('close', () => console.log('🟢 CB CLOSED - hoạt động bình thường'));
breaker.on('reject', () => console.log('⛔ Request bị chặn do CB đang mở'));

// API để test gọi dịch vụ
app.get('/call', async (req, res) => {
  try {
    const result = await breaker.fire();
    res.send({ status: 'OK', message: result });
  } catch (err) {
    res.status(503).send({ status: 'FAIL', message: err.toString() });
  }
});

// API kiểm tra trạng thái hiện tại của CB
app.get('/status', (req, res) => {
  res.send({
    state: breaker.status.stats.open
      ? 'OPEN'
      : breaker.status.stats.halfOpen
      ? 'HALF-OPEN'
      : 'CLOSED',
    stats: breaker.status.stats,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
