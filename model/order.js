// const DBconnection = require("../util/Database_Connection").getConnection;
// const sql = require("mssql");



// exports.addOrder = async (userID, cartId, address, cost) => {
//     try {
//         let result = await DBconnection()
//             .request()
//             .input("cartID", sql.Int, `${cartId}`)
//             .input("userID", sql.Int, `${userID}`)
//             .input("cost", sql.Money, `${cost}`)
//             .input("address", sql.VarChar, `${address}`)
//             .query(
//                 `INSERT INTO [defaultUser].[Orders] (userID, cartID, cost, address) output
//                 inserted.ID, inserted.cartID Values (@userID, @cartID, @cost, @address);
//                 `
//             );
//         const { ID, cartID } = result.recordset[0];
//         result = await insertOrderItems(ID, cartID);
//         return result.rowsAffected[0];
//     } catch (err) {
//         console.log(err);
//         throw new Error();
//     }
// };

// const insertOrderItems = async (ID, cartID) => {
//     try {
//         const result = await DBconnection()
//             .request()
//             .input("cartID", sql.Int, `${cartID}`)
//             .input("ID", sql.Int, `${ID}`)
//             .query(
//                 `INSERT INTO [defaultUser].[OrderItem] (orderID, productID, quantity) 
//                 Select ID, productID, quantity from [defaultUser].[Orders] ,[defaultUser].[CartItem]  
//                 where [defaultUser].[Orders].ID = @ID AND [defaultUser].[CartItem].cartID = @cartID ;
                
//                 Delete from [defaultUser].[CartItem] Where cartID = @cartID;
//                 `
//             );
//         return result;
//     } catch (err) {
//         console.log(err);
//         throw new Error();
//     }
// };

// exports.getOrder = async (userID) => {
//     try {
//         let result = await DBconnection()
//             .request()
//             .input("userID", sql.Int, `${userID}`)
//             .query(
//                 `Select * from [defaultUser].[Orders] Where userID = @userID AND status = 0
//                 `
//             );
//         return result.recordset;
//     } catch (err) {
//         console.log(err);
//         throw new Error();
//     }
// };


// exports.deleteOrder = async (orderID) => {
//     try {
//         let result = await DBconnection()
//             .request()
//             .input("orderID", sql.Int, `${orderID}`)
//             .query(
//                 `Delete from [defaultUser].[Orders] Where ID = @orderID AND status = 0
//                 `
//             );
//         return result.rowsAffected[0];
//     } catch (err) {
//         console.log(err);
//         throw new Error();
//     }
// };
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/Database_Connection");


const Order = sequelize.define(
    "Order",
    {
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Order;