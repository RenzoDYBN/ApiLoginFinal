const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});


exports.busqueda = async(req, res) => {
    const id_piezas_buscado =  req.body.id_piezas;
    db.query('SELECT * FROM ALMACEN WHERE nombre_piezas LIKE %?% ',[id_piezas_buscado],(err, rows, fields) => {
      if(!err){
        console.log('Pieza consultada:'+ id_piezas_buscado)
        res.json(rows);
        
      }else {
        console.log(err);
      }

    });
    //console.log('LLEGO AL BUSQUEDA')
}  

exports.agregar = async(req, res) => {
    console.log('LLEGO AL AGREGAR')
} 

exports.eliminar = async(req, res) => {
    console.log('LLEGO AL ELIMINAR')
} 

exports.actualizar = async(req, res) => {
    console.log('LLEGO AL ACTUALIZAR')
} 
