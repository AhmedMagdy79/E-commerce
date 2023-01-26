const DBconnection = require("../util/Database_Connection").getConnection;
const sql = require("mssql");
require("dotenv").config();

exports.register = async (email, userName, password) => {
    try {
        const result = await DBconnection()
            .request()
            .input("email", sql.VarChar, `${email}`)
            .input("password", sql.VarChar, `${password}`)
            .input("username", sql.VarChar, `${userName}`)
            .query(
                `INSERT INTO [defaultUser].[Users] (email,name,password) Values(@email,@username,@password); 
                `
            );
        return result.rowsAffected[0];
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};

exports.login = async (email) => {
    try {
        const result = await DBconnection()
            .request()
            .input("email", sql.VarChar, `${email}`)
            .query(
                `SELECT U.ID as userID , C.ID as cartID, email,admin,password
                    FROM defaultUser.Users as U
                    INNER JOIN defaultUser.Cart as C
                    on U.ID = C.userID AND U.ID=58; 
                `
            );
        return result.recordset[0];
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};


exports.emailExist = async (email) => {
    try {
        const result = await DBconnection()
            .request()
            .input("email", sql.VarChar, `${email}`)
            .query(
                `Select * From [defaultUser].[Users] Where email=@email; 
                `
            );
        return result.recordset[0];
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};