const authService = require("../service/auth.service");

//
exports.register = async (req, res, next) => {
    try {
        const { type, statusCode, message, user } = await authService.register(
            req.body
        );
        user.password = undefined;
        user.verificationToken = undefined;
        user.tokenExpireDate = undefined;
        return res.status(statusCode).json({ type, message, user });
    } catch (err) {
        next(err);
    }
};

exports.verifyEmail = async (req, res, next) => {
    try {
        const { type, statusCode, message } = await authService.verifyEmail(
            req.body
        );

        return res.status(statusCode).json({ type, message });
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
