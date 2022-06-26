const express = require('express');
const mysql = require('mysql2');
const doenv = require("dotenv");
const path = require('path');
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const app = express();
const db = require("./databases/mysqlConnection.js")

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const location = path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "hbs");

const partialsPath = path.join(__dirname, "/views/partials");
hbs.registerPartials(partialsPath);

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5004, () => {
    console.log("Server Started @ Port 5004");
});