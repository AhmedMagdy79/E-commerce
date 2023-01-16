const sql = require("mssql");
require("dotenv").config();
let connection;
const sqlConfig = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    server: "localhost\\SQLEXPRESS",
    port: 4234,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
};

sql.on("error", (err) => {
    console.log(err);
});

module.exports = {
    init: async () => {
        try {
            connection = await sql.connect(sqlConfig);
            console.log("db connected");
        } catch (err) {
            console.log(err);
        }
    },
    getConnection: () => {
        if (!connection) {
            throw new Error("DB not notConnected");
        }
        return connection;
    },
};
