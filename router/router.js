const { Router } = require("express");
const router = Router();
const { addProduct, getAllProduct, deleteProduct, updateProduct } = require("../controllers/crud.control");
const Stripe = require('stripe'); // Stripe'ni import qilamiz
const stripe = Stripe('your-stripe-secret-key'); // Bu yerga o'z Stripe maxfiy kalitingizni qo'shing

// CRUD operatsiyalari uchun marshrutlar
router.post("/add", addProduct);
router.get("/getall", getAllProduct);
router.delete("/delete/:id", deleteProduct); // Mahsulotni o'chirish uchun marshrut
router.put("/update/:id", updateProduct); // Mahsulotni yangilash uchun marshrut

// To'lov yaratish uchun handler
router.post('/payment', async (req, res) => { // /api ni olib tashlang, chunki bu allaqachon use("/api") ichida
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
