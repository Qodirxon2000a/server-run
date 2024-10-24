const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const productRoutes = require('./router/product.routes');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB ulanish muvaffaqiyatli'))
  .catch(err => console.error('MongoDB ulanishda xatolik', err));

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishlayapti`);
});
