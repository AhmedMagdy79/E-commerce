
const errors = require("../util/error_handling");



exports.addProductToCart = async (req, res, next) => {
    try {
        const { cartID, productID } = req.body;
        const result = await db.addProductToCart(cartID, productID);
        if (result) {
            res.status(201).json({ message: "product added to cart Successfully" });
        } else {
            throw new Error();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};


exports.deleteProductFromCart = async (req, res, next) => {
    try {
        const { cartID, productID } = req.body;
        const result = await db.deleteProductFromCart(cartID, productID);
        if (result) {
            res.status(200).json({
                message: "product removed from cart Successfully",
            });
        } else {
            throw new Error();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};


exports.clearProductsFromCart = async (req, res, next) => {
    try {
        const {cartID} = req.body;
        const result = await db.clearProductsFromCart(cartID);
        if (result) {
            res.status(200).json({
                message: "cart have been cleared Successfully",
            });
        } else {
            throw new Error();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.getCartProducts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await db.getCartProducts(id);
        if (result) {
            const {ID, ...other} = result
            res.status(200).json(other);
        } else {
            errors.notFoundError();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};