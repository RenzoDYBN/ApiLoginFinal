const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const db = require("../databases/mysqlConnection")
const express = require('express');

exports.registerPeople = (req, res) => {
    //console.log(req.body);
        const { 
            dni_persona, 
            nombre_persona, 
            apellido_paterno, 
            apellido_materno, 
            telefono, 
            correo_electronico, 
            direccion_persona } = req.body;

            db.query('select dni_persona from personas where dni_persona=?', [dni_persona],

            

    
        (error, result) => {
            if (error) {
                confirm.log(error);
            }
            db.query("insert into usuarios set ?", { dni_persona: dni_persona, codigo_rol: Number(codigo_rol), nombre_usuario: nombre_usuario, pass: hashedPassord, estado_usuario: "Activo" },
                (error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(result);
                        return res.render("register", { msg: "Registro Exitoso", msg_type: "good" })
                    }

                })
        });
        
};


exports.registerPeople = (req, res) => {
    try {
        console.log()
        res.json("POST Persona")
        /*
        {
            message: 'POST Persona'
        })
        */
    } catch (error) {
        console.log(error);
    }
};

exports.getPeople = (req, res) => {
    console.log(req.body);
    const { dni_persona } = req.body;
    db.query('select * from usuarios where dni_persona=?', [dni_persona],
        (error, result) => {
            if (error) {
                confirm.log(error);
            }
            db.query("insert into usuarios set ?", { dni_persona: dni_persona, codigo_rol: Number(codigo_rol), nombre_usuario: nombre_usuario, pass: hashedPassord, estado_usuario: "Activo" },
                (error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(result);
                        return res.render("register", { msg: "Registro Exitoso", msg_type: "good" })
                    }

                })
        });
};

exports.updatePeople = (req, res) => {
    try {
        res.json({
            message: 'UPDATE Persona'
        })
    } catch (error) {
        console.log(error);
    }
};

exports.deletePeople = (req, res) => {
    try {
        res.json({
            message: 'DELETE Persona'
        })
    } catch (error) {
        console.log(error);
    }
};