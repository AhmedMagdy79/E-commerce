const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const errors = require("../util/error_handling");
const moment = require("moment");
const { generateVerifyEmailToken } = require("../util/mailToken");
const { sendVerificationMail } = require("../util/sendMail");
const {
    validateUserData,
    validateLogIn,
    validateverifyEmail,
} = require("../util/validation");

const userModel = require("../model/user.model");

exports.register = async (body) => {
    try {
        const { name, email, password } = body;

        //validation
        const { error } = validateUserData(body);
        if (error) {
            errors.validationError(error.details);
        }

        //check email
        const emailExist = await userModel.findOne({ where: { email: email } });
        if (emailExist) {
            errors.validationError("this email isn't available");
        }

        //create verificatin token and its expire date
        const verifyMailToken = generateVerifyEmailToken();
        const tokenExpiryDate = moment()
            .add(process.env.TOKEN_DURATIONS_IN_MINUTES, "minutes")
            .toISOString();

        hashedPassword = crypto.AES.encrypt(
            password,
            process.env.PASSWORD_SECRET
        ).toString();
        user = await userModel.create({
            email: email,
            name: name,
            password: hashedPassword,
            verificationToken: verifyMailToken,
            tokenExpireDate: tokenExpiryDate,
        });
        await user.createCart();
        await user.save();
        // send verfiy mail
        sendVerificationMail(verifyMailToken, email);

        return {
            type: "Success",
            statusCode: 201,
            message: "user created Successfully",
            user: user,
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.verifyEmail = async (body) => {
    try {
        const { email, token } = body;

        //validation
        const { error } = validateverifyEmail(body);
        if (error) {
            errors.validationError(error.details);
        }

        const user = await userModel.findOne({ where: { email: email } });
        if (!user) {
            errors.notFoundError("user not found");
        }

        const currentTime = moment().toISOString();
        if (
            token !== user.verificationToken || moment(currentTime).isAfter(user.tokenExpireDate)
        ) {
            errors.badRequestError("wrong token");
        }

        user.isVerified = true;
        await user.save();
        return {
            type: "Success",
            statusCode: 200,
            message: "user Verified Successfully",
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
};
