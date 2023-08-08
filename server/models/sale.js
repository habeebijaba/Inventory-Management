const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  cashPaid: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
