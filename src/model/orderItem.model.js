const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/Database_Connection");

const OrderItem = sequelize.define(
    "OrderItem",
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

module.exports = OrderItem;
