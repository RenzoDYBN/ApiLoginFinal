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

//LA CONSULTA SE REALIZARA POR EL NOMBRE DE LA PIEZA Y TRAERA TODOS LOS REGISTROS QUE COINCIDAN
exports.busqueda = async(req, res) => {
    try {
        const nombre_pieza = "";
        //const { nombre_pieza} = req.body;
        //VALIDAMOS QUE EL CAMPO "NOMBRE_PIEZA" VENGA INFORMADO(DIFERENTE DE NULL)
        if (!nombre_pieza || null) {
            // return res.status(400).render("busqueda", {
            // msg: "Ingresa nombre de pieza a buscar",
            //  msg_type: "error",
            console.log('DEBE DE INGRESAR UN NOMBRE A BUSCAR')
                //});
                //SI VIENE EL VALOR INFORMADO PROCEDEMOS HACER LA CONSULTA 
        } else {

            //const nombre_pieza =  "tornillo";
            const simbolo_porcentaje = '%';
            const valor_busqueda = simbolo_porcentaje.concat(nombre_pieza, simbolo_porcentaje);
            db.query('SELECT * FROM almacen WHERE nombre_pieza LIKE ? ', [valor_busqueda], (err, rows, fields) => {
                if (!err) {
                    console.log('Pieza consultada SELECT:' + err)
                    res.json(rows);
                } else {
                    console.log(err);
                }
            });
        }

    } catch (error) {
        console.log(error);
    }
}

//LA CONSULTA SE REALIZARA POR EL ID_PIEZAS Y TRAERA UN UNICO REGISTRO
exports.busqueda_id_piezas = async(req, res) => {
    try {
        const id_pieza = "1";
        db.query('SELECT * FROM almacen WHERE id_pieza = ? ', [id_pieza], (err, rows, fields) => {
            if (!err) {
                console.log('ID consultada:' + err)
                res.json(rows);

            } else {
                // return res.status(400).render("busqueda", {
                // msg: "Ingresa nombre de pieza a buscar",
                //  msg_type: "error",
                console.log('NO SE ENCONTRO LA ID_PIEZA')
                    //});
                console.log(err);
            }

        });
    } catch (error) {
        console.log(error);
    }
}

//SE ACTUALIZARA REGISTRO QUE FUE BUSCADO CON EL ID_PIEZAS
exports.actualizar = async(req, res) => {
    //const id_pieza =  "1";
    const id_pieza_buscada = req.body.id_pieza;
    db.query('UPDATE almacen set ? WHERE id_piezas = ?', [req.body, id_pieza_buscada], (err, rows, fields) => {
        if (!err) {
            console.log('LLEGO AL ACTUALIZAR')
            res.json(rows);

        } else {
            console.log(err);
        }

    });

}



// exports.addpiece = async(req, res) => {

//     console.log(req.body);
//     const { nombre_pieza, descripcion_pieza, stock_piezas } = req.body;
//     db.query("insert into almacen set ?", { nombre_pieza: "tornillos", descripcion_pieza: "tornillos para ensamblar", stock_piezas: "20" }, (err, rows) => {
//         if (err) return res.send(err)
//         res.send('Pieza agregada!');
//     });
//     console.log('LLEGO AL AGREGAR 2022')
// }

//AGREGAMOS LAS PIEZAS NUEVAS A LA BASE DE DATOS
exports.addpiece = (req, res) => {
    console.log(req.body);
    const { nombre_pieza, descripcion_pieza, stock_piezas } = req.body;
    db.query('select * from almacen where nombre_pieza=?', [nombre_pieza],
        (error, result) => {
            if (result.length > 0) {
              console.log(result.length);
                return res.render("addpiece", { msg: "El nombre de pieza que intenta registrar ya existe", msg_type: "error" })
            } else {
              console.log(result);
                db.query("insert into almacen set ?", { nombre_pieza: nombre_pieza, descripcion_pieza: descripcion_pieza, stock_piezas: stock_piezas },
                    (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(result);
                            return res.render("addpiece", { msg: "Registro Exitoso", msg_type: "good" })
                        }
                    })
            }
        });
};

// exports.addpiece = (req, res) => {
//     console.log(req.body);
//     const { nombre_pieza, descripcion_pieza, stock_piezas } = req.body;
//     console.log(req.body);


//     db.query("insert into almacen set ?", { nombre_pieza: nombre_pieza, descripcion_pieza: descripcion_pieza, stock_piezas: stock_piezas },
//         (error, result) => {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log(result);
//                 return res.render("addpiece", { msg: "Registro Exitoso", msg_type: "good" })
//             }

//         })

// }



//exports.eliminar = async(req, res) => {
//   console.log('LLEGO AL ELIMINAR')
//}