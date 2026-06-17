require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bihe Nepal Backend Running");
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Verify database connection on start
    await prisma.$connect();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Warning: Database connection failed. Please check your DATABASE_URL in .env.");
    console.error(error.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();