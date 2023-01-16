const express = require("express");

const app = express();
require("dotenv").config();

const databaseConnection = require("./util/Database_Connection");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

app.use((req, res, next) => {
    console.log("err 404");
    res.status(404).json("404", { pageTitle: "Page Not Found", path: "" });
});

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || "somthing went wrong";
    res.status(status).json({
        message: message,
    });
});


app.listen(5000, databaseConnection.init);