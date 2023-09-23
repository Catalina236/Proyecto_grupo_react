import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";
function App() {
  const[Listpersona,setPersona]=useState([]);
  const[correo_electronico, setEmail]=useState("");
  const[contraseña,setContraseña]=useState("");
  const[num_doc,setNumDoc]=useState("");
  const[tipo_doc,setTipo_doc]=useState("");
  const[nombres,setNombres]=useState("");
  const[apellidos,setApellidos]=useState("");
  const[telefono,setTelefono]=useState("");
  const[direccion,setDireccion]=useState("");
  const[cod_usuario, setCodigo]=useState("");
  const[nom_tipo_usuario,setTipoUsuario]=useState("");
  const[editar,setEditar]=useState(false);
    
  const add=()=>{
    Axios.post("http://localhost:3001/create",{
      correo_electronico:correo_electronico,
      contraseña:contraseña,
      num_doc:num_doc,
      tipo_doc:tipo_doc,
      nombres:nombres,
      apellidos:apellidos,
      telefono:telefono,
      direccion:direccion,
      nom_tipo_usuario:nom_tipo_usuario,
      cod_usuario:cod_usuario
    }).then(()=>{
      listar();
      clear();
      Swal.fire({
        title:"<strong> Registro exitoso!!!</strong>",
        html:"<i>El usuario "+nombres+" </strong> fue registrado con éxito!!!</i>",
        icon:"success",
        timer:3000
      })
    }).catch(function(error){
      Swal.fire({
        icon:'error',
        title:'Ooops....',
        text:JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      })
    });

  }

  const update=()=>{
    Axios.put("http://localhost:3001/update",{
      num_doc:num_doc,
      tipo_doc:tipo_doc,
      nombres:nombres,
      apellidos:apellidos,
      correo_electronico:correo_electronico,
      telefono:telefono,
      direccion:direccion,
      cod_usuario:cod_usuario
  }).then(()=>{
    listar();
    clear();
    Swal.fire({
      title:"<strong> Actualización exitosa!!!</strong>",
      html:"<i>El usuario "+nombres+" </strong> fue actualizado con éxito!!!</i>",
      icon:"success",
      timer:3000
    })
  }).catch(function(error){
    Swal.fire({
      icon:'error',
      title:'Ooops....',
      text:JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
    })
  });

}
  const editarUsuario=(val)=>{
    setEditar(true);
    setNumDoc(val.num_doc);
    setTipo_doc(val.tipo_doc);
    setNombres(val.nombres);
    setApellidos(val.apellidos);
    setEmail(val.correo_electronico);
    setTelefono(val.telefono);
    setDireccion(val.direccion);
    setCodigo(val.cod_usuario);
  }

  const clear=()=>{
    setNumDoc("");
    setTipoUsuario("");
    setTipo_doc("");
    setNombres("");
    setApellidos("");
    setEmail("");
    setContraseña("")
    setTelefono("");
    setDireccion("")
    setCodigo("");
    setPersona([]);
  }

  const listar=()=>{
    Axios.get("http://localhost:3001/ver").then((response)=>{
      setPersona(response.data);
    });
  }
  
  const Eliminar=(val)=>{

    Swal.fire({
      title:'Confirmar eliminado?',
      html:"<i>Realmente desea eliminar a <strong>"+ val.nombres+ "</strong>?</i>",
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Sí, eliminarlo!'
    }).then((result)=>{
      if(result.isConfirmed){
        Axios.delete(`http://localhost:3001/delete/${val.correo_electronico}`).then((res)=>{
          listar();
          //clear();
          Swal.fire({
            icon:'success',
            title:val.nombres+' fue eliminado.',
            showConfirmButton:false,
            timer:2000
          });
        }).catch(function(error){
          Swal.fire({
            icon:'error',
            title:'Ooops....',
            text:'No se logró eliminar el usuario!',
            footer:JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    });
  }
    return(
      <div className="container">
      <div className='card text_center'>
        <div className='card-header'style={{backgroundColor:'white'}}>
          REGISTRAR
        </div>
        <div className='card-body'>
          <div className='formulario'>
          <h3>Datos de Usuario</h3>
            <div className='contenedor-form'>

            <div className='info'>
              <label>Correo electronico</label>
              <input type='email' onChange={(event) => {
                setEmail(event.target.value);
              }} className='form-control' value={correo_electronico}></input>
            </div>

            <div className='info'>
                <label>Contraseña</label>
                <input type='password' onChange={(event) => {setContraseña(event.target.value);
                }} className='form-control' value={contraseña}/>
                </div>

            <div className='info'>
              <label>Numero de Documento</label>
              <input type='number' onChange={(event) => {setNumDoc(event.target.value);
              }}
              className='form-control' value={num_doc}></input>
            </div>

            <div className='info'>
              <label>Tipo de Documento</label>
                <select onChange={(event) => {setTipo_doc(event.target.value);
                  }}className='form-control'
                  value={tipo_doc}>
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
                setCodigo(event.target.value)
              }} className='form-control' value={cod_usuario}></input>
              </div>

              <div className='info'>
                <label>Tipo de usuario</label>
                <select onChange={(event)=>{setTipoUsuario(event.target.value);
                }}
                className='form-control' name={nom_tipo_usuario}>
                  <option value="">Seleccione...</option>
                  <option value="Cliente">Cliente</option>
                  <option value="Empleado">Empleado</option>
                </select>
                </div>
                </div>
                </div>
            <div className='card-footer text-muted' style={{backgroundColor:'white'}}>
              {editar?
                <div>
                  <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                  <button className='btn btn-info m-2' onClick={clear}>Limpiar</button>
                </div>
                  :<button className='btn btn-success'onClick={add} style={{height:'39px',marginTop:'7px'}}>Registrar</button>
              }
            
                  <button className='btn btn-secondary' style={{height:'39px',marginTop:'7px'}} onClick={listar}>Ver datos</button>
            </div>
          </div>
        </div>
        <div className='lista'>
        <table className='table table-striped'>
          <thead>
            <tr>  
              <th scope='col'>Número de documento</th>
              <th scope='col'>Tipo de documento</th>
              <th scope='col'>Nombres</th>
              <th scope='col'>Apellidos</th>
              <th scope='col'>Email</th>
              <th scope='col'>Teléfono</th>
              <th scope='col'>Dirección</th>
              <th scope='col'>Código de usuario</th>
            </tr>
          </thead>

          <tbody>
            {
              Listpersona.map((val,key)=>{
              return <tr key={val.num_doc}>
                <th>{val.num_doc}</th>
                <td>{val.tipo_doc}</td>
                <td>{val.nombres}</td>
                <td>{val.apellidos}</td>
                <td>{val.correo_electronico}</td>
                <td>{val.telefono}</td>
                <td>{val.direccion}</td>
                <td>{val.cod_usuario}</td>
              <td>
                <div className='btn-group' role='group' aria-label='Basic example'>
                  <button type="button" onClick={()=>{editarUsuario(val);}} className='btn btn-warning'>Actualizar</button>
                </div>
                <div className='btn_group' role='group' aria-label='Basic example'>
                  <button type='button' onClick={()=>{
                    Eliminar(val);
                  }} className='btn btn-danger'>Eliminar</button>
                </div>
              </td>
              </tr>
            })
          }
          </tbody>
        </table>
      </div>
      </div>
    );
    
}

export default App;
