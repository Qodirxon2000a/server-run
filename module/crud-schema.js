const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  avatar: { type: String },
  data: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
