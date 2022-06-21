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
    db.query('select nombre_usuario from usuarios where nombre_usuario=?', [nombre_usuario],
        async(error, result) => {
            if (error) {
                confirm.log(error);
            }
            // if (dni_persona.length > 0) {
            //     return res.render("register", {
            //         msg: 'El dni ya esta registrado , intenta con otro dni',
            //         msg_type: "error"
            //     });
            // }
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
            // let codigo_rolN = Number(document.getElementById('codigo_rol').value);

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

exports.edituser = (req, res) => {
    console.log(req.body);
    const { dni_persona, codigo_rol, nombre_usuario, password } = req.body;
    db.query('select nombre_usuario from usuarios where nombre_usuario=?', [nombre_usuario],
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
            // let codigo_rolN = Number(document.getElementById('codigo_rol').value);

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

exports.searchuser = (req, res) => {
    console.log(req.body);
    const { dni_persona, codigo_rol, nombre_usuario, password } = req.body;
    db.query('select nombre_usuario from usuarios where nombre_usuario=?', [nombre_usuario],
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
            // let codigo_rolN = Number(document.getElementById('codigo_rol').value);

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