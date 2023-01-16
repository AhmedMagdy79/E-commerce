const DBconnection = require("../util/Database_Connection").getConnection;
const sql = require("mssql");


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