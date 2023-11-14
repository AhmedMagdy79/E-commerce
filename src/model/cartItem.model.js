const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/Database_Connection");

const CartItem = sequelize.define(
    "CartItem",
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = CartItem;
