const jwt = require("jsonwebtoken");
const errors = require("../util/error_handling");
require("dotenv").config();

const verifyToken = (req, res, next, checkUser) => {
    try {
        const authHeader = req.headers.token;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            try {
                user = jwt.verify(token, process.env.JWT_SECRET);
                req.user = user;
                checkUser();
            } catch (err) {
                errors.forbiddenError();
            }
        } else {
            errors.forbiddenError();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        try {
            if (req.user.id == req.params.id) {
                next();
            } else {
                errors.forbiddenError();
            }
        } catch (err) {
            console.log(err);
            next(err);
        }
    });
};

const verifyUserCart = (req, res, next) => {
    verifyToken(req, res, next, () => {
        try {
            if (
                req.user.userCartID == req.body.cartID &&
                req.user.id == req.body.userID
            ) {
                next();
            } else {
                errors.forbiddenError();
            }
        } catch (err) {
            console.log(err);
            next(err);
        }
    });
};

const verifyAdmin = (req, res, next) => {
    try {
        verifyToken(req, res, next, () => {
            if (req.user.isAdmin) {
                next();
            } else {
                errors.forbiddenError();
            }
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};


module.exports = {
    verifyUser,
    verifyUserCart,
    verifyAdmin,
};
