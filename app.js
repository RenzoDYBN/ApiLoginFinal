const express = require('express');
const mysql = require('mysql2');
const doenv = require("dotenv");
const path = require('path');
const hbs = require("hbs");
// const ejs = require('ejs');
const cookieParser = require("cookie-parser");
const app = express();

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
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// console.log(__dirname);
// app.set('view engine', 'ejs');
const location = path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "hbs");

const partialsPath = path.join(__dirname, "/views/partials");
hbs.registerPartials(partialsPath);

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5003, () => {
    console.log("Server Started @ Port 5003");
});