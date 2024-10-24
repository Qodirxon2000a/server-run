const { Schema, model } = require("mongoose");

const RingSchema = new Schema({
     category: {
          type: String,
          required: true,
     },
     rasm: {
          type: String,
          required: true,
     },
     nomi: {
          type: String,
          required: true,
     },
     soni: {
          type: Number, // Измените на Number
          required: true,
     },
     narxi: {
          type: Number, // Измените на Number
          required: true,
     },
     
});


module.exports = model("RingSchema", RingSchema); // Убедитесь, что нет пробела в названии модели
