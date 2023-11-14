
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const errors = require("../util/error_handling");
const {validateUserData, validateLogIn} = require("../util/validation");
require("dotenv").config();

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const {error} = validateUserData(req.body);
        if(error){
            errors.validationError(error.details);
        }
        const emailExist = db.emailExist(email);
        if (emailExist){
            errors.validationError("this email isn't available");
        }
        hashedPassword = crypto.AES.encrypt(
            password,
            process.env.PASSWORD_SECRET
        );
        result = await db.register(email, name, hashedPassword);
        if (result) {
            return res.status(201).json({ result: "user created succesfully" });
        } else {
            throw new Error();
        }
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password: inputPassword } = req.body;
        const { error } = validateLogIn(req.body);
        if (error) {
            errors.validationError(error.details);
        }
        const user = await db.login(email);
        if (!user) {
            errors.unauthorizedError("wrong email or password");
        }
        userPassword = crypto.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET
        ).toString(crypto.enc.Utf8);
        if (inputPassword !== userPassword) {
            errors.unauthorizedError("wrong email or password");
        }
        const accessToken = jwt.sign(
            {
                id: user.userID,
                isAdmin: user.admin,
                userCartID: user.cartID,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );
        const { password, ...other } = user;
        res.status(200).json({ userData: { ...other, accessToken } });
    } catch (err) {       
            next(err);
    }
};
