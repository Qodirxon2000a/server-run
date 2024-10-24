const CrudSchema = require('../module/crud-schema')

const addProduct = async (req, res) => {
     try {
          // const { rasm, nomi, soni, narxi } = req.body
          const newProduct = await new CrudSchema(req.body)
          await newProduct.save();
          res.status(201).json(newProduct)
     } catch (error) {
          res.status(500).json({ message: "Mahsulotni qo'shishda xatolik", error })
     }
}

const getAllProduct = async (req, res) => {
     try {
          const products = await CrudSchema.find()
          res.status(200).json(products)
     } catch (error) {
          res.status(500).json({ message: "Mahsulotlarni olishda xatolik", error })
     }
}

const deleteProduct = async (req, res) => {
     try {
       const { id } = req.params; // O'chirilishi kerak bo'lgan mahsulot ID-sini olish
       const deletedProduct = await CrudSchema.findByIdAndDelete(id); // Mahsulotni o'chirish
       if (!deletedProduct) {
         return res.status(404).json({ message: "Mahsulot topilmadi" }); // Agar mahsulot topilmasa, 404 xatosi
       }
       res.status(200).json({ message: "Mahsulot muvaffaqiyatli o'chirildi" }); // Mahsulot muvaffaqiyatli o'chirilsa, javob berish
     } catch (error) {
       res.status(500).json({ message: "Mahsulotni o'chirishda xatolik", error }); // Xato haqida javob berish
     }
   };
   

const updateProduct = async (req, res) => {
     try {
          const { id } = req.params;
          const { rasm, nomi, soni, narxi } = req.body;

          const updatedProduct = await CrudSchema.findByIdAndUpdate(
               id,
               { rasm, nomi, soni, narxi },
               { new: true } 
          );

          if (!updatedProduct) {
               return res.status(404).json({ message: "Mahsulot topilmadi" });
          }

          res.status(200).json(updatedProduct);
     } catch (error) {
          res.status(500).json({ message: "Mahsulotni yangilashda xatolik", error });
     }
};

module.exports = { addProduct, getAllProduct, deleteProduct, updateProduct }
