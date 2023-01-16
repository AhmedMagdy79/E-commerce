const db = require("../model/order");
const errors = require("../util/error_handling");

exports.addOrder = async (req, res, next) => {
    try {
        const { userId, address, productIDs } = req.body;
        const result = await db.addProductToCart(cartID, productID);
        if (result) {
            res.status(201).json({
                message: "product added to cart Successfully",
            });
        } else {
            throw new Error();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};
