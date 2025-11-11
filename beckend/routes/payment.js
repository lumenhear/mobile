const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'your_test_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_test_key_secret'
});

// Create order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Payment error', error: error.message });
  }
});

// Verify payment
router.post('/verify-payment', async (req, res) => {
  try {
    // In production, verify Razorpay signature
    const { order_id, payment_id } = req.body;
    
    // For demo, we'll just return success
    res.json({ 
      success: true, 
      message: 'Payment verified successfully',
      paymentId: payment_id 
    });
  } catch (error) {
    res.status(500).json({ message: 'Verification failed', error: error.message });
  }
});

module.exports = router;
