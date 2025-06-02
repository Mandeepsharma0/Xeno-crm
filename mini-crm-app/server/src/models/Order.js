const mongoose = require('mongoose');
const Customer = require('./Customer');
 
const orderSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;