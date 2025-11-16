const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));

// Products route
app.get("/products", (req, res) => {
  res.json(data.products || []);
});

// Users route
app.get("/users", (req, res) => {
  res.json(data.users || []);
});

// Dynamic port (important for Vercel)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
