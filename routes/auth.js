const express = require('express');
const userController = require('../controllers/users');
const almacen_Controller = require('../controllers/store');
const router = express.Router();

//CONTROL USUARIO 
// router.post("/searchuser2", userController.searchuser2);
router.post("/searchuser", userController.searchuser);
router.post("/register", userController.register);
router.post("/edituser", userController.edituser);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

//STORE-ALMACEN
router.get("/busqueda", almacen_Controller.busqueda);
router.get("/busqueda_id_piezas", almacen_Controller.busqueda);
router.post("/addpiece", almacen_Controller.addpiece);
router.put("/actualizar", almacen_Controller.actualizar);

module.exports = router;