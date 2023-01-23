const db = require("../model/order");
const errors = require("../util/error_handling");

exports.addOrder = async (req, res, next) => {
    try {
        const { userID, address, cartID, cost} = req.body;
        const result = await db.addOrder(userID, cartID, address, cost);
        if (result) {
            res.status(201).json({
                message: "order Created Successfully",
            });
        } else {
            throw new Error();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};
