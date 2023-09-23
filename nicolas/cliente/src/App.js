import './App.css';
// importar de react al estado para los formularios
import {useState} from "react";
//importar Axios
import Axios from "axios";
//importar bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
//importar sweetalert
import Swal from "sweetalert2";

//interfaz retornada al usuario
function App(){

  const [num_doc,setNum_doc]=useState("");
  const [tipo_doc,setTipo_doc]=useState("");
  const [nombres,setNombres]=useState("");
  const [apellidos,setApellidos]=useState("");
  const [correo_electronico,setCorreo]=useState("");
  const [telefono, setTelefono]=useState("");
  const [direccion,setDireccion]=useState("");
  const [cod_usuario,setCod_usu]=useState("");

  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      num_doc: num_doc,
      tipo_doc: tipo_doc,
      nombres: nombres,
      apellidos: apellidos,
      correo_electronico: correo_electronico,
      telefono: telefono,
      direccion: direccion,
      cod_usuario: cod_usuario
    }).then(()=>{
      Swal.fire({
        title: "<strong>Registro Exitoso!</strong>",
        html: "<i>El usuario <strong>"+nombres+"</strong> fue registrado </i>",
        icon: 'success',
        timer: 3000
      })
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
  
  }
return (
  <div className="container">

    <div className='card text_center'>
      <div className='card-header'>
        REGISTRAR
      </div>
      <div className='card-body'>
        <div className='formulario'>
          <h3>Datos de Usuario</h3>
          <div className='info'>
            <label>Numero de Documento</label>
            <input type='number' onChange={(event) => {setNum_doc(event.target.value);
            }}
            className='form-control' value={num_doc}></input>
          </div>
          <div className='info'>
            <label>Tipo de Documento</label>
              <select
                onChange={(event) => {
                  setTipo_doc(event.target.value);
                }}
                className='form-control'
                value={tipo_doc}
              >
                {/* Opciones del select */}
                <option vaalue="">Tipo de documento</option>
                <option value='Cédula de Ciudadanía'>Cédula de Ciudadanía</option>
                <option value='Cédula de extranjería'>Cédula de extranjeria</option>
                <option value='Pasaporte'>Pasaporte</option>
                {/*opciones de documento*/}
              </select>
            </div>
          <div className='info'>
            <label>Nombres</label>
            <input type='text' onChange={(event) => {setNombres(event.target.value);
            }} className='form-control' value={nombres}></input>
          </div>
          <div className='info'>
            <label>Apellidos</label>
            <input type='text' onChange={(event)=>{
              setApellidos(event.target.value);
            }} className='form-control' value={apellidos}></input>
          </div>
          <div className='info'>
            <label>Correo_Electronico</label>
            <input type='email' onChange={(event) => {
              setCorreo(event.target.value);
            }} className='form-control' value={correo_electronico}></input>
          </div>
          <div className='info'>
            <label>Telefono</label>
            <input type='text' onChange={(event)=>{
              setTelefono(event.target.value);
            }} className='form-control' value={telefono}></input>
          </div>
          <div className='info'>
            <label>Direccion</label>
            <input type='text' onChange={(event)=>{
              setDireccion(event.target.value)
            }} className='form-control' value={direccion}></input>
          </div>
          <div className='info'>
            <label>Codigo de usuario</label>
            <input type='number' onChange={(event) =>{
              setCod_usu(event.target.value)
            }} className='form-control' value={cod_usuario}></input>
          </div>
        </div>
      </div>
    </div>
    
    <div className='card-footer text-muted'>
      {
        <button className='btn btn-success' onClick={add}>Registrar</button>
      }
    </div>

    </div>  
);

}
export default App;

