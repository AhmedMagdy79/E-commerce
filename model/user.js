// const DBconnection = require("../util/Database_Connection").getConnection;
// const sql = require("mssql");
// require("dotenv").config();

// exports.editUser = async (id, name, email, password) => {
//     try {
//         const result = await DBconnection()
//             .request()
//             .input("id", sql.Int, `${id}`)
//             .input("email", sql.VarChar, `${email}`)
//             .input("name", sql.VarChar, `${name}`)
//             .input("password", sql.VarChar, `${password}`)
//             .query(
//                 `UPDATE [defaultUser].[Users] SET email=@email, password =@password, name=@name  OUTPUT inserted.*  where ID=@id;
//                 `
//             );
//         return result.recordset[0];
//     } catch (err) {
//         console.log(err);
//         throw new Error();
//     }
// };

// exports.deleteUser = async (id) => {
//     try {
//         const result = await DBconnection()
//             .request()
//             .input("id", sql.Int, `${id}`)
//             .query(
//                 `DELETE from [defaultUser].[Users]  where ID=@id;
//                 `
//             );

//         return result.rowsAffected[0]
//     } catch (err) {
//         console.log(err);
//         throw new Error;
//     }
// };

// exports.getUser = async (id) => {
//     try {
//         const result = await DBconnection()
//             .request()
//             .input("id", sql.Int, `${id}`)
//             .query(
//                 `SELECT * from [defaultUser].[Users]  where ID=@id;
//                 `
//             );
//             console.log(result);
//         return result.recordset[0];
//     } catch (err) {
//         console.log(err);
//         throw new Error();
//     }
// };

// exports.getAllUsers = async () => {
//     try {
//         const result = await DBconnection()
//             .request()
//             .query(
//                 `SELECT * from [defaultUser].[Users] ;
//                 `
//             );
//         return result.recordset;
//     } catch (err) {
//         console.log(err);
//         throw new Error();
//     }
// };

// exports.getNewestUsers = async (number) => {
//     try {
//         const result = await DBconnection()
//             .request()
//             .input("number", sql.Int, `${number}`)
//             .query(
//                 `SELECT TOP (@number) * from [defaultUser].[Users] order by created_at desc;
//                 `
//             );
//         return result.recordset;
//     } catch (err) {
//         console.log(err);
//         throw new Error();
//     }
// };

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/Database_Connection");

const User = sequelize.define(
    "User",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        timestamps: true,
    }
);

module.exports.User = User;
