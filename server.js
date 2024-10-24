const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const itemRoutes = require("./router/router");
const morgan = require("morgan");

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // Log incoming requests

app.use("/api", itemRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'UP' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Сервернинг запущен на порту ${PORT}`));
