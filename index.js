const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);

app.listen(3000, () => console.log("Listening on port 3000"));
