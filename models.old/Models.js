const { Model, DataTypes } = require("sequelize");

const Order = class Order extends Model {};
const User = class User extends Model {};

module.exports.init = async (sequelize) => {
  User.init(
    {
      name: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  Order.init(
    {
      orderId: { type: DataTypes.STRING, primaryKey: true },
    },
    { sequelize, modelName: "Order" }
  );

  Order.belongsTo(User);
  User.hasMany(Order);

  await sequelize.sync();
};

module.exports.User = User;
module.exports.Order = Order;
