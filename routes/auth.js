const express = require('express');
const userController = require('../controllers/users');
const almacen_Controller = require('../controllers/store');
const peopleController = require('../controllers/peopleController')
const router = express.Router();

//CONTROL USUARIO 
router.post("/searchuser", userController.searchuser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

//STORE-ALMACEN
router.get("/busqueda", almacen_Controller.busqueda);
router.get("/busqueda_id_piezas", almacen_Controller.busqueda);
router.post("/addpiece", almacen_Controller.addpiece);
router.put("/actualizar", almacen_Controller.actualizar);

//path people
router.post("/registerPeople", peopleController.registerPeople);
router.get("/getPeople", peopleController.getPeople);
router.put("/updatePeople", peopleController.updatePeople);
router.delete("/deletePeople", peopleController.deletePeople);

module.exports = router;