const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const userController = require('../controllers/users');
const almacen_Controller = require('../controllers/store');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});

router.get(["/", "/login"], (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    res.render("login");
});

router.get("/register", userController.isLoggedIn, (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    res.render("register");

});
//creando ruta para consultar para extraer data usuarios
router.get("/data", userController.isLoggedIn, (req, res) => {
    db.query("select * from usuarios", (error, results) => {
        if (error) {
            throw error;

        } else {
            data = JSON.stringify(results);
            res.send(data);
        }
    })

});

router.get("/home", userController.isLoggedIn, (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    // console.log(req.name);
    if (req.user) {
        res.render("home", { user: req.user });
    } else {
        res.redirect("/login");
    }
});

router.get("/home/register", userController.isLoggedIn, (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    // res.render("register", { user: req.user });
    // res.redirect("/login");
    if (req.user) {
        res.render("register", { user: req.user });
    } else {
        res.redirect("/login");
    }


});

//revisando
router.get("/searchuser", userController.isLoggedIn, (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    res.render("searchuser");

});

router.get("/home/searchuser", userController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render("searchuser", { user: req.user });
    } else {
        res.redirect("/login");
    }

});

//STORE-ALMACEN--JOSUE ROBLES BUSTAMANTE
router.get("/busqueda", almacen_Controller.busqueda, (req, res) => {
    res.render("busqueda");
});
router.post("/addpiece", almacen_Controller.addpiece, (req, res) => {
    res.render("addpiece");
});
router.get("/home/addpiece", userController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render("addpiece", { user: req.user });
    } else {
        res.redirect("/login");
    }
});
router.get("/actualizar", almacen_Controller.actualizar, (req, res) => {
    res.render("actualizar");
});
router.get("/busqueda_id_piezas", almacen_Controller.busqueda_id_piezas, (req, res) => {
    res.render("busqueda_id_piezas");
});

module.exports = router;