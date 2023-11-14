const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: "localhost",
        dialect: "mssql",
        port: 64814,
    }
);
try {
    (async function () {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    })();
} catch (error) {
    console.error("Unable to connect to the database:", error);
}
module.exports = sequelize;

const User = require("../model/user.model.js");
const Product = require("../model/product.model.js");
const Cart = require("../model/cart.model.js");
const CartItem = require("../model/cartItem.model.js");
const Order = require("../model/order.model.js");
const OrderItem = require("../model/orderItem.model.js");

User.hasMany(Order);
User.hasOne(Cart);
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsToMany(Product, { through: OrderItem });
