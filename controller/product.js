const db = require("../model/product");
const errors = require("../util/error_handling");
const { validateProductData } = require("../util/validation");

exports.createProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        const { error } = validateProductData(req.body);
        if (error) {
            errors.validationError(error.details);
        }
        const result = await db.createProduct(productData);
        if (result) {
            res.status(201).json({ message: "product created Successfully" });
        } else {
            throw new Error();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        const id = req.params.id;
        const { error } = validateProductData(req.body);
        if (error) {
            errors.validationError(error.details);
        }
        const result = await db.updateProduct(id, productData);
        if (result) {
            res.status(200).json({ message: "product Updated Successfully" });
        } else {
            errors.notFoundError();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await db.deleteProduct(id);
        if (result) {
            res.status(200).json({ message: "Product deleted Successfully" });
        } else {
            errors.notFoundError();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await db.getProduct(id);
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

exports.getAllProducts = async (req, res, next) => {
    try {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        let result;
        if (qNew) {
            result = await db.getNewestProducts(qNew);
        } else if (qCategory) {
            result = await db.getProductsByCategory(qCategory);
        } else {
            result = await db.getAllProducts();
        }

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
