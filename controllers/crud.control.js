// CRUD operatsiyalari
const products = []; // Mahsulotlarni saqlash uchun vaqtincha massiv

// Yangi mahsulot qo'shish
const addProduct = async (req, res) => {
    try {
        const { name, category, price } = req.body;
        const avatarUrl = req.file ? `/uploads/${req.file.filename}` : ''; // Avatarni qo'lga olish

        const newProduct = { name, category, price, avatar: avatarUrl }; // Yangi mahsulot yaratish
        products.push(newProduct); // Mahsulotlarni massivga qo'shish
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Mahsulot qo'shishda xato", error });
    }
};

// Barcha mahsulotlarni olish
const getAllProduct = async (req, res) => {
    try {
        res.status(200).json(products); // Mahsulotlarni qaytarish
    } catch (error) {
        res.status(500).json({ message: "Mahsulotlarni olishda xato", error });
    }
};

// Mahsulotni o'chirish
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const index = products.findIndex(product => product.id === id); // Mahsulotni topish

        if (index === -1) {
            return res.status(404).json({ message: "Mahsulot topilmadi" });
        }
        products.splice(index, 1); // Mahsulotni o'chirish
        res.status(200).json({ message: "Mahsulot muvaffaqiyatli o'chirildi" });
    } catch (error) {
        res.status(500).json({ message: "Mahsulotni o'chirishda xato", error });
    }
};

// Mahsulotni yangilash
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price } = req.body;
        const avatarUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

        const product = products.find(p => p.id === id); // Mahsulotni topish

        if (!product) {
            return res.status(404).json({ message: "Mahsulot topilmadi" });
        }

        // Mahsulotni yangilash
        product.name = name || product.name;
        product.category = category || product.category;
        product.price = price || product.price;
        product.avatar = avatarUrl || product.avatar;

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Mahsulotni yangilashda xato", error });
    }
};

module.exports = { addProduct, getAllProduct, deleteProduct, updateProduct };
