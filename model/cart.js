const DBconnection = require("../util/Database_Connection").getConnection;
const sql = require("mssql");

const checkForItemInCart = async (cartID, productID) => {
    try {
        const result = await DBconnection()
            .request()
            .input("cartID", sql.Int, `${cartID}`)
            .input("productID", sql.Int, `${productID}`)
            .query(
                `Select * from [defaultUser].[CartItem] where cartID=@cartID AND  productID=@productID; 
                `
            );
        return result;
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};

exports.addProductToCart = async (cartID, productID) => {
    try {
        let query;
        const checkForItem = await checkForItemInCart(cartID, productID);
        if (checkForItem.rowsAffected[0]) {
            query =
                "UPDATE [defaultUser].[CartItem] SET quantity=quantity+1  WHERE cartID=@cartID AND ProductID=@productID;";
        } else {
            query =
                "INSERT INTO [defaultUser].[CartItem] (cartID,ProductID) Values (@cartID,   @productID);";
        }
        const result = await DBconnection()
            .request()
            .input("cartID", sql.Int, `${cartID}`)
            .input("productID", sql.Int, `${productID}`)
            .query(query);
        return result.rowsAffected[0];
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};

exports.deleteProductFromCart = async (cartID, productID) => {
    try {
        let query;
        const checkForItem = await checkForItemInCart(cartID, productID);
        if (checkForItem.recordset[0].quantity > 1) {
            query =
                "UPDATE [defaultUser].[CartItem] SET quantity=quantity-1  WHERE cartID=@cartID AND ProductID=@productID;";
        } else {
            query =
                "Delete From [defaultUser].[CartItem]  WHERE cartID=@cartID AND ProductID=@productID;";
        }
        const result = await DBconnection()
            .request()
            .input("cartID", sql.Int, `${cartID}`)
            .input("productID", sql.Int, `${productID}`)
            .query(query);
        return result.rowsAffected[0];
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};

exports.clearProductsFromCart = async (cartID) => {
    try {
        const result = await DBconnection()
            .request()
            .input("cartID", sql.Int, `${cartID}`)
            .query(
                "Delete From [defaultUser].[CartItem]  WHERE cartID=@cartID;"
            );
        return result.rowsAffected[0];
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};

exports.getCartProducts = async (ID) => {
    try {
        const result = await DBconnection()
            .request()
            .input("ID", sql.Int, `${ID}`)
            .query(`SELECT * from (SELECT productID,quantity FROM defaultUser.Cart as C
                    INNER JOIN defaultUser.CartItem as CI
                    on C.ID = CI.cartID AND C.userID = @ID) as productInfo
                    inner join defaultUser.Products as P
                    on productInfo.productID = P.ID`);
        return result.recordset;
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};
