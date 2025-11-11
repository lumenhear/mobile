const mongoose = require('mongoose');

const rechargeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  operator: {
    type: String,
    required: true
  },
  circle: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 5
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    unique: true
  },
  paymentId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recharge', rechargeSchema);
