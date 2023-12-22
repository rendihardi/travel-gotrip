const db = require("./db/index.js");
const express = require("express");
const app = express();
const port = 3000;
const contactModel = require("./model/contact.js");
const qnaModel = require("./model/qna.js");
const cors = require("cors");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Middleware for contact form input validation
function validateFeedback(req, res, next) {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({ error: "Semua kolom harus diisi." });
  }
  next();
}

// Endpoint to store feedback (POST request)
app.post("/proses_feedback", validateFeedback, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    // Save feedback to database using Sequelize model
    await contactModel.create({ firstName, lastName, email, phone, message });
    res.status(201).json({ message: "Feedback berhasil disimpan." });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
});

// Get qna

app.get("/return_qna", async (req, res) => {
  try {
    const data = await qnaModel.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
});

// Middleware for qna form input validation
function validateqna(req, res, next) {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: "Semua kolom harus diisi." });
  }
  next();
}

// Endpoint to store qna (POST request)
app.post("/proses_qna", validateqna, async (req, res) => {
  try {
    const { name, message } = req.body;
    // Save qna to database using Sequelize model
    await qnaModel.create({ name, message });
    res.status(201).json({ message: "Question berhasil disimpan." });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
});

// Database Synchronization
async function startdb() {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("database connected");
  } catch (error) {
    console.log("database not connected");
  }
}

startdb();

app.get("/", (req, res) => {
  res.send("Server Jalan!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
