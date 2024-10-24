const { Router } = require("express");
const router = Router();
const { addProduct, getAllProduct, deleteProduct, updateProduct } = require("../controllers/crud.control");
const Stripe = require('stripe'); // Импортируем Stripe
const stripe = Stripe('your-stripe-secret-key'); // Добавь сюда свой секретный ключ от Stripe

// Маршруты для CRUD операций
router.post("/add", addProduct);
router.get("/getall", getAllProduct);
router.delete("/delete/:id", deleteProduct); // Маршрут для удаления продукта
router.put("/update/:id", updateProduct); // Маршрут для обновления продукта

// Обработчик для создания платежа
router.post('/payment', async (req, res) => { // /api убери, так как это уже в use("/api")
     const { amount, currency, token } = req.body;

     try {
          const paymentIntent = await stripe.paymentIntents.create({
               amount,
               currency,
               payment_method: token,
               confirm: true,
          });

          res.json({ success: true, paymentIntent });
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
});

module.exports = router;
