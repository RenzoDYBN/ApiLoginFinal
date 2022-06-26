const mysql = require('mysql2');
const doenv = require("dotenv");


doenv.config({
    path: './.env'
});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`MySQL Connection Success`);
    }
})

module.exports = db;