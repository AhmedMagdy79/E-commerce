const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: "localhost",
        dialect: "mssql",
        port: 64814,
    }
);
module.exports = sequelize;
try {
    (async function () {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    })();
} catch (error) {
    console.error("Unable to connect to the database:", error);
}
// console.log(sequelize);
