const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  company: String,
  description: String,
  status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Referral', referralSchema);
