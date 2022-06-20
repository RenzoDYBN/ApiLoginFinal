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
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).render("login", {
                msg: "Ingresa Tu Usuario y Contraseña",
                msg_type: "error",
            });
        }
        db.query("select * from users where email=?", [email],
            async(error, result) => {
                console.log(result);
                if (result.length <= 0) {
                    return res.status(401).render("login", {
                        msg: "Correo o Contraseña incorrecta",
                        msg_type: "error",
                    });
                } else {
                    if (!(await bcrypt.compare(password, result[0].PASS))) {
                        return res.status(401).render("login", {
                            msg: "Correo o Contraseña incorrecta",
                            msg_type: "error",
                        });
                    } else {
                        const id = result[0].ID;
                        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
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
                        res.cookie("joes", token, cookieOptions);
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
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const cpassword = req.body.cpassword;
    // console.log(name);
    // console.log(email);
    // console.log(cpassword, "jaja");
    const { name, email, password, cpassword } = req.body;
    db.query('select email from users where email=?', [email],
        async(error, result) => {
            if (error) {
                confirm.log(error);
            }
            if (result.length > 0) {
                return res.render("register", {
                    msg: 'El correo ya esta registrado , intenta con otro Email',
                    msg_type: "error"
                });
            } else if (password !== cpassword) {
                return res.render("register", { msg: "Las contraseñas no coinciden", msg_type: "error" })
            }
            let hashedPassord = await bcrypt.hash(password, 8);
            console.log(hashedPassord);

            db.query("insert into users set ?", { name: name, email: email, pass: hashedPassord },
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
    if (req.cookies.joes) {
        try {
            const decode = await promisify(jwt.verify)(
                req.cookies.joes,
                process.env.JWT_SECRET
            );
            db.query("select * from users where id=?", [decode.id], (err, results) => {
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
    res.cookie("joes", "logout", {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true,
    });
    res.status(200).redirect("/");
}