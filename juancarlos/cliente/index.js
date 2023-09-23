//Cargar la librería de express una libreria de Node que proporciona la escritura de manejadores de peticiones con diferentes verbos HTTP en diferentes caminos URL (rutas).
const express = require('express');
const app = express();
//cargar el paquete de mysql para conectar la base de datos
const mysql = require('mysql');
//cargar el cors
const cors = require('cors');

//Ejecutarla antes de que el usuario acceda al registro
app.use(cors());
app.use(express.json());

// crear conexion a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hotel"
});

//metodo registrar
app.post("/create",(req,res)=>{
    const cod_servicio = req.body.cod_servicio;
    const num_doc_cliente = req.body.num_doc_cliente;


    //generar la consulta guardar, pra ello se debe instalar Axios de react(detenga la ejecucuon del proyecto desde la terminal y ejecute npm install axios)
    db.query('INSERT INTO servicios_adicionales(cod_servicio, num_doc_cliente) VALUES(?,?)', [
        cod_servicio, num_doc_cliente], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send("registro exitoso")
        }
    }
    );
});

app.get("/servicios",(req,res) => {
    db.query('SELECT * FROM servicios_adicionales', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }
    );
});

app.put("/update",(req,res)=>{
    const cod_servicio = req.body.cod_servicio;
    const num_doc_cliente = req.body.num_doc_cliente;

    db.query('UPDATE servicios_adicionales SET num_doc_cliente=? WHERE cod_servicio=?', [num_doc_cliente, cod_servicio], (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    }
    );
});

app.delete("/delete/:cod_servicio", (req, res) => {
    const cod_servicio = req.params.cod_reserva;

    db.query('DELETE * FROM servicios_adicionales WHERE cod_servicios=?',cod_servicio, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.send(result);
        }
    }
    );
});

//activar el puerto para la conexion
app.listen(3001,()=>{
    console.log("puerto activado")
})