const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/auth");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);

app.get("/", authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

app.listen(3000, () => console.log("Listening on port 3000"));
