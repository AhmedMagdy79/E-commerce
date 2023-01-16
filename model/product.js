const DBconnection = require("../util/Database_Connection").getConnection;
const sql = require("mssql");

exports.createProduct = async (productData) => {
    try {
        const { title, descreption, imgURL, category, size, color, price } =
            productData;
        const result = await DBconnection()
            .request()
            .input("title", sql.VarChar, `${title}`)
            .input("descreption", sql.VarChar, `${descreption}`)
            .input("imgURL", sql.VarChar, `${imgURL}`)
            .input("category", sql.VarChar, `${category}`)
            .input("size", sql.VarChar, `${size}`)
            .input("color", sql.VarChar, `${color}`)
            .input("price", sql.Money, `${price}`)
            .query(
                `INSERT INTO [defaultUser].[Products] (title,descreption,imgURL,category,size,color,price) Values (@title,@descreption,@imgURL,@category,@size,@color,@price); 
                `
            );
        return result.rowsAffected[0];
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};

exports.updateProduct = async (id, productData) => {
    try {
        const { title, descreption, imgURL, category, size, color, price } =
            productData;
        console.log(productData);
        console.log(id);
        const result = await DBconnection()
            .request()
            .input("ID", sql.Int, `${id}`)
            .input("title", sql.VarChar, `${title}`)
            .input("descreption", sql.VarChar, `${descreption}`)
            .input("imgURL", sql.VarChar, `${imgURL}`)
            .input("category", sql.VarChar, `${category}`)
            .input("size", sql.VarChar, `${size}`)
            .input("color", sql.VarChar, `${color}`)
            .input("price", sql.Money, `${price}`)
            .query(
                `UPDATE [defaultUser].[Products] set title=@title,descreption=@descreption,imgURL=@imgURL,category=@category,size=@size,color=@color,price=@price OUTPUT inserted.* where ID= @ID ;
                `
            );
        return result.recordset[0];
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};


exports.deleteProduct = async (id) => {
    try {
        const result = await DBconnection()
            .request()
            .input("id", sql.Int, `${id}`)
            .query(
                `DELETE from [defaultUser].[Products]  where ID=@id; 
                `
            );
            
        return result.rowsAffected[0];
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};

exports.getAllUsers = async () => {
    try {
        const result = await DBconnection()
            .request()
            .query(
                `SELECT * from [defaultUser].[Users] ; 
                `
            );
        return result.recordset;
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};


exports.getNewestUsers = async (number) => {
    try {
        const result = await DBconnection()
            .request()
            .input("number", sql.Int, `${number}`)
            .query(
                `SELECT TOP (@number) * from [defaultUser].[Users] order by created_at desc; 
                `
            );
        return result.recordset;
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};


exports.getAllProducts = async () => {
    try {
        const result = await DBconnection()
            .request()
            .query(
                `SELECT * from [defaultUser].[Products] ; 
                `
            );
        return result.recordset;
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};

exports.getNewestProducts = async (number) => {
    try {
        const result = await DBconnection()
            .request()
            .input("number", sql.Int, `${number}`)
            .query(
                `SELECT TOP (@number) * from [defaultUser].[Products] order by created_at desc; 
                `
            );
        return result.recordset;
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};


exports.getProductsByCategory = async (category) => {
    try {
        const result = await DBconnection()
            .request()
            .input("category", sql.VarChar, `${category}`)
            .query(
                `SELECT * from [defaultUser].[Products] where category=@category; 
                `
            );
        return result.recordset;
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};