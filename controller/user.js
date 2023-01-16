const db = require("../model/user");
const crypto = require("crypto-js");
const errors = require("../util/error_handling");

exports.editUser = async (req, res, next) => {
    try {
        const { email, name, password } = req.body;
        const id = req.params.id;
        const hashedPassword = crypto.AES.encrypt(
            password,
            process.env.PASSWORD_SECRET
        );
        const result = await db.editUser(id, name, email, hashedPassword);
        if (result) {
            res.status(200).json(result);
        } else {
            errors.notFoundError();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const result = await db.deleteUser(req.params.id);
        if(result){
            res.status(200).json({ message: "User deleted Successfully" });
        }else{
            errors.notFoundError();
        }        
    } catch (err) {
        console.log(err);
        next(err);
    }
};


exports.getUser =  async (req, res, next) => {
    try {
        const result = await db.getUser(req.params.id);
        if (result) {
            res.status(200).json(result);
        } else {
            errors.notFoundError();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const query = req.query.new;       
        const result = query ? await db.getNewestUsers(query) : await db.getAllUsers();
        if (result) {
            res.status(200).json(result);
        } else {
            errors.notFoundError();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};