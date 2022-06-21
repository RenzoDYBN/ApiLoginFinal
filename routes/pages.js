const express = require("express");
const router = express.Router();
const userController = require('../controllers/users');
const almacen_Controller = require('../controllers/store');

router.get(["/", "/login"], (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    res.render("login");
});

router.get("/register", (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    res.render("register");
});

router.get("/profile", userController.isLoggedIn, (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    if (req.user) {
        res.render("profile", { user: req.user });
    } else {
        res.redirect("/login");
    }
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

//STORE-ALMACEN--JOSUE ROBLES 

router.get("/busqueda",almacen_Controller.busqueda, (req, res) => {
    res.render("busqueda");
});
router.post("/agregar", almacen_Controller.agregar, (req, res) => {
    res.render("agregar");
});
router.delete("/eliminar", almacen_Controller.eliminar, (req, res) => {
    res.render("eliminar");
});
router.get("/actualizar",almacen_Controller.actualizar, (req, res) => {
    res.render("actualizar");
});



module.exports = router;