const db = require("../model/order");
const errors = require("../util/error_handling");
const {validateOrderData} = require("../util/validation");

exports.addOrder = async (req, res, next) => {
    try {
        const { userID, address, cartID, cost} = req.body;
        const { error } = validateOrderData(req.body);
        if (error) {
            errors.validationError(error.details);
        }
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


exports.getOrder = async (req, res, next) => {
    try {
        const  userID  = req.params.id;
        const result = await db.getOrder(userID);
        if (result) {
            res.status(200).json({
                "orders": result,
            });
        } else {
            throw new Error();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};


exports.deleteOrder = async (req, res, next) => {
    try {
        const orderID = req.params.orderID;
        const result = await db.deleteOrder(orderID);
        if (result) {
            res.status(200).json({
                "message": "order deleted successfully",
            });
        } else {
            throw new Error();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};