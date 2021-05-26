const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../models/index");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await db.Users.create({
      name: req.body.name.toLowerCase(),
      email: req.body.email,
      password: hash,
    });
    // res.status(200).json({ user });
    jwt.sign(
      { id: user.id },
      process.env.SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// localhost:3000/api/v1/auth/register POST
// ~/v1/auth/ POST = authentication

router.post("/", async (req, res) => {
  try {
    const user = await db.Users.findOne({
      where: {
        name: req.body.name.toLowerCase(),
      },
    });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      // res.status(200).json({ user });
      jwt.sign(
        { id: user.id },
        process.env.SECRET,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(200).json({ token });
        }
      );
      // res.status(200).json({ user });
    } else {
      res.status(403).json({ error: "Permission denied." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
