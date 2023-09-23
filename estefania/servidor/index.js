const express = require("express");
const app = express();
// cargar el paquete de mysql para conectar la base de datos
const mysql =  require("mysql");
//cargar cors
const cors  = require("cors");


//ejecutarla antes de que el usuario acceda al registro
app.use(cors());
app.use(express.json());

//conexion a la base de datos
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"proyecto_hotel"
});

//metodo registrar
app.post("/create", (req, res) => {
    const num_doc = req.body.num_doc;
    const tipo_doc = req.body.tipo_doc;
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const correo_electronico = req.body.correo_electronico;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    const cod_usuario = req.body.cod_usuario;

    db.query('INSERT INTO persona(num_doc,tipo_doc,nombres,apellidos,correo_electronico,telefono,direccion,cod_usuario) VALUES(?,?,?,?,?,?,?,?)', [num_doc,tipo_doc,nombres,apellidos,correo_electronico,telefono,direccion,
    cod_usuario],(error, result)=>{
        if(error){
            console.log(error);
        }else{
            res.send("Registro exitoso")
        }
    }
    );
});



//activar el puerto de la conexion
app.listen(3001,() =>{
    console.log("puerto activo")
});
