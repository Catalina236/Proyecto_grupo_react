const express=require('express')
const app=express();
const mysql=require("mysql");
const cors=require('cors');

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"base_proyecto"
});

app.post("/create", (req, res) => {
    const correo_electronico = req.body.correo_electronico;
    const contraseña = req.body.contraseña;
    const cod_usuario = req.body.cod_usuario;
    const nom_tipo_usuario=req.body.nom_tipo_usuario;
    const num_doc = req.body.num_doc;
    const tipo_doc = req.body.tipo_doc;
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    
    db.query('INSERT INTO usuarios (correo_electronico, contraseña) VALUES (?, ?)', [correo_electronico, contraseña], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error en la inserción de usuarios");
        } else {

            db.query('INSERT INTO tipo_persona (cod_usuario, nom_tipo_usuario) VALUES (?, ?)',
            [cod_usuario, nom_tipo_usuario], (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).send("Error en la inserción de tipo persona");
                } else {
                    db.query('INSERT INTO persona (num_doc, tipo_doc, nombres, apellidos, correo_electronico, telefono, direccion, cod_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [num_doc, tipo_doc, nombres, apellidos, correo_electronico, telefono, direccion, cod_usuario], (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).send("Error en la inserción de persona");
                } else {
                    res.status(200).send('Registro exitoso');
                }

            });
        }
    });
}
});
});


app.listen(3001,()=>{
    console.log("puerto activo")
})

app.get("/ver",(req,res)=>{
    db.query("SELECT * FROM persona",
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});
app.delete("/delete/:correo_electronico", (req,res)=>{
    const correo_electronico=req.params.correo_electronico;
    db.query('DELETE FROM usuarios WHERE correo_electronico=?',correo_electronico,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
}
);
