const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  rechargeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recharge',
    required: true
  },
  type: {
    type: String,
    enum: ['direct', 'indirect'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Commission', commissionSchema);
