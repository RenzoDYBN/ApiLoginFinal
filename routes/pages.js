const express = require("express");
const router = express.Router();
const userController = require('../controllers/users');

router.get(["/", "/login"], (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    res.render("login");
});

router.get("/register", userController.isLoggedIn, (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    res.render("register");

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

router.get("/edituser", userController.isLoggedIn, (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    res.render("edituser");

});

router.get("/home/edituser", userController.isLoggedIn, (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    // res.redirect("/login");
    if (req.user) {
        res.render("edituser", { user: req.user });
    } else {
        res.redirect("/login");
    }

});

router.get("/searchuser", userController.isLoggedIn, (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    res.render("searchuser");

});

router.get("/home/searchuser", userController.isLoggedIn, (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    // res.redirect("/login");
    if (req.user) {
        res.render("searchuser", { user: req.user });
    } else {
        res.redirect("/login");
    }

});

router.get("/home/searchuser2", userController.isLoggedIn, (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    // res.redirect("/login");
    if (req.user) {
        res.render("searchuser", { user: req.user });
    } else {
        res.redirect("/login");
    }

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

module.exports = router;