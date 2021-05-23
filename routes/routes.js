const { User } = require("../models.old/Models");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
