const { Schema, model } = require("mongoose");

// Define the Ring schema
const RingSchema = new Schema({
  rasm: {
    type: String,
    required: true,
  },
  nomi: {
    type: String,
    required: true,
  },
  soni: {
    type: Number, // Quantity of the ring
    required: true,
  },
  narxi: {
    type: Number, // Price of the ring
    required: true,
  },
});

// Create and export the Ring model
module.exports = model("Ring", RingSchema);
