const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
require('dotenv').config();

app.use(cors()); // Enable CORS
app.use(express.json());

const PORT = process.env.PORT || 5000;  // Change to 5000 if it was 4000


app.listen(PORT, () => {
    console.log(`Server started at Port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Jai Shree Ram");
});

const connection = require('./config/database');
connection();

const reviewRoutes = require('./routes/Review');
app.use("/api/v1", reviewRoutes);
