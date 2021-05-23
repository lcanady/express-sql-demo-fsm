/**
 * NOTE!
 * const results = await User.findAll({where: {name: }})
 */

const { Sequelize } = require("sequelize");
const cors = require("cors");
const helmet = require("helmet");
const { init } = require("./models/Models");
const routes = require("./routes/routes");
const express = require("express");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite3",
});

// const app = require("express")();
const app = express();

(async () => {
  await init(sequelize);

  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.get("/", (req, res) => res.send("hello world!"));
  app.use("/api/v1/users", routes);
  app.listen(3000);

  //   const jane = await User.create({
  //     name: "Jane Doe",
  //     email: "user@email.com",
  //     password: "234234234234234234",
  //   });
  //   await jane.save();
  //   const order = new Order({ orderId: "werwerwerwe34534534", UserId: 1 });
  //   await order.save();

  //   const results = await User.findAll({ include: Order });
  //   console.log(JSON.stringify(results, null, 4));
})();
