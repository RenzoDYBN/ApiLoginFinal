const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { setFlagsFromString } = require("v8");


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});

exports.login = async(req, res) => {
    try {
        const { nombre_usuario, password } = req.body;
        if (!nombre_usuario || !password) {
            return res.status(400).render("login", {
                msg: "Ingresa Tu Usuario y Contraseña",
                msg_type: "error",
            });
        }
        db.query("select * from usuarios where nombre_usuario=?", [nombre_usuario],
            async(error, result) => {
                console.log(result);
                if (result.length <= 0) {
                    return res.status(401).render("login", {
                        msg: "Correo o Contraseña incorrecta",
                        msg_type: "error",
                    });
                } else {
                    if (!(await bcrypt.compare(password, result[0].pass))) {
                        return res.status(401).render("login", {
                            msg: "Correo o Contraseña incorrecta",
                            msg_type: "error",
                        });
                    } else {
                        const usuario = result[0].usuario;
                        const token = jwt.sign({ usuario: usuario }, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRES_IN,
                        });
                        console.log("The token is " + token);
                        const cookieOptions = {
                            expires: new Date(
                                Date.now() +
                                process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                            ),
                            httpOnly: true,
                        };
                        res.cookie("fixmort", token, cookieOptions);
                        res.status(200).redirect("/home");
                    }
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
}
exports.register = (req, res) => {
    console.log(req.body);
    const { dni_persona, codigo_rol, nombre_usuario, password, cpassword } = req.body;
    db.query('select * from usuarios where nombre_usuario=?', [nombre_usuario],
        async(error, result) => {
            if (error) {
                confirm.log(error);
            }
            if (result.length > 0) {
                return res.render("register", {
                    msg: 'El usuario ya esta registrado , intenta con otro Usuario',
                    msg_type: "error"
                });
            } else if (password !== cpassword) {
                return res.render("register", { msg: "Las contraseñas no coinciden", msg_type: "error" })
            }
            let hashedPassord = await bcrypt.hash(password, 8);
            console.log(hashedPassord);

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
//pegar aqui searchuser
exports.searchuser = (req, res) => {
    var action = req.body.action;


    if (action == 'Add') {

        var dni_persona = req.body.dni_persona;
        var codigo_rol = req.body.codigo_rol;
        var password = req.body.password;
        var cpassword = req.body.cpassword;
        var flag = 1;

        console.log(action);
        //CONSULTA SI EL DNI EXISTE EN LA TABLA PERSONAS
        db.query("select * from personas where dni_persona=?", [dni_persona],
        async(error, result) => {
            if (error) {
                confirm.log(error);
            }
            console.log("result length: "+ result.length);
            if (result.length == 0) {
                console.log("El DNI NO existe en la tabla PERSONAS add termina");
                //confirm.log(error);
                return res.status(400).render("searchuser", {
                    msg: "Ingresa Tu Usuario y Contraseña",
                    msg_type: "error",
                });
            }else{                  
                console.log("El DNI existe en la tabla personas");
                db.query("select * from usuarios where dni_persona=?", [dni_persona],
                async(error, result) => {
                   if (error) {
                      confirm.log(error);
                   }
                   if (result.length == 0) {  
                       if (password == cpassword) {               
                           let hashedPassword = await bcrypt.hash(password, 8);
                           console.log(hashedPassword);   
                           adduser(hashedPassword);   
                       }else{
                           console.log("Las contraseñas no coinciden");
                           return res.render("searchuser", { msg: "Las contraseñas no coinciden", msg_type: "error" })
                        }      
                   }else{
                      console.log("Ya existe usuario con ese DNI");
                    }
                })  
            }
        });  
    
        function adduser(hashedPassword) {
             //VALIDACION PARA LA CREACION DE EL USUARIO primera letra de primer nombre + primer apellido + primera letra de 2do apellido ( Jose Manuel Perez Ramirez, jperezr)
        db.query('SELECT nombre_persona,apellido_paterno,apellido_materno FROM personas WHERE dni_persona = ?',
        [dni_persona],(err, results) => {
            if(!err){
              
              //res.json(rows);
              data1 = JSON.stringify(results[0].nombre_persona); 
              data2 = JSON.stringify(results[0].apellido_paterno); 
              data3 = JSON.stringify(results[0].apellido_materno);            
              console.log('nombre_persona:' + data1);
              console.log('apellido_paterno:' + data2);
              console.log('apellido_materno:' + data3);

                //res.json(rows);
                data1 = JSON.stringify(results[0].nombre_persona);
                data2 = JSON.stringify(results[0].apellido_paterno);
                data3 = JSON.stringify(results[0].apellido_materno);
                console.log('nombre_persona:' + data1);
                console.log('apellido_paterno:' + data2);
                console.log('apellido_materno:' + data3);

                let result1 = data1.substring(2, 1);
                const result2 = data2.slice(1, -1)
                console.log('apellido_paterno recortado:' + result2);
                let result3 = data3.substring(2, 1);

                console.log('nombre_persona:' + result1);
                console.log('apellido_paterno:' + result2);
                console.log('apellido_materno:' + result3);

                const nombre_usuario_mayusculas = result1.concat(result2, result3);
                var nombre_usuario = nombre_usuario_mayusculas.toLowerCase();
                console.log('USUARIO A CREAR:' + nombre_usuario);

                //INSERTAMOS AL NUEVO USUARIO
                var query = `INSERT INTO usuarios (dni_persona, codigo_rol, nombre_usuario, pass, estado_usuario) 
             VALUES ("${dni_persona}", "${codigo_rol}", "${nombre_usuario}", "${hashedPassword}", "Activo")
             `;
                db.query(query, function(error, data) {
                    // console.log(action);
                    console.log("Usuario registrado");
                    res.json({
                        message: 'Data Added'

                    });
                });


            } else {
                console.log(err);
            }
      
          });
        }
    }

};

exports.deleteuser = (req, res) => {
    console.log("INGRESE AQUI")
    var action = req.body.action;
    var id = req.body.id;
    if (action == 'delete') {     
        console.log("voy a eliminar usuario:" + id)
        db.query('UPDATE usuarios SET estado_usuario = ? WHERE usuario = ?', ["Desactivado", id],(err, rows, fields) => {
            if(err) return res.send(err)
              res.send('Se elimino usuario'+ id);
          }); 
    }
}


exports.isLoggedIn = async(req, res, next) => {
    // console.log(req.cookies);
    if (req.cookies.fixmort) {
        try {
            const decode = await promisify(jwt.verify)(
                req.cookies.fixmort,
                process.env.JWT_SECRET
            );
            db.query("select * from usuarios where usuario=?", [decode.usuario], (err, results) => {
                if (!results) {
                    return next();
                }
                req.user = results[0];
                return next();
            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        console.log(error);
        return next();
    }
};

exports.logout = async(req, res) => {
    res.cookie("fixmort", "logout", {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true,
    });
    res.status(200).redirect("/");
}