const jwt = require("jsonwebtoken");
const db = require("../models/index");

module.exports = (req, res, next) => {
  // Get bearer token
  const token = req.headers["authorization"]?.split(" ")[1] || "";

  // verify my token
  jwt.verify(token, process.env.SECRET, {}, async (err, decoded) => {
    try {
      if (err) return res.status(500).json({ error: err.message });
      // add user to request

      if (decoded) {
        const user = await db.Users.findOne({ where: { id: decoded.id } });
        req.user = user;
        // next
        next();
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
