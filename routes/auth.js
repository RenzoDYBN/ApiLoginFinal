const express = require('express');
const userController = require('../controllers/users');
const almacen_Controller = require('../controllers/store');
const router = express.Router();

//LOGIN
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

//STORE-ALMACEN
router.get("/busqueda", almacen_Controller.busqueda);
router.post("/agregar", almacen_Controller.agregar);
router.delete("/eliminar", almacen_Controller.eliminar);
router.put("/actualizar", almacen_Controller.actualizar);


module.exports = router;