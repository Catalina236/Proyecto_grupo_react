import './App.css';
// importar para react el estado para los datos del formulario//
import {useState} from "react";
// Importar Axios//
import Axios from "axios";
// Importr Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Importar Sweetalert2
import Swal from "sweetalert2";

function App(){
//Estado Datos
  const [cod_servicio, setServicio] = useState(0);
  const [num_doc_cliente, setNum_doc_cliente] = useState("");
;
//Estado Actualizar
  const [editar, setEditar] = useState([false]);
//Estado Consultar
  const [usuariosList, setServicios_adicionales] = useState([]);
// Metodo Crear
  const add= () => {
    Axios.post("http://localhost:3001/create",{
      cod_servicio: cod_servicio,
      num_doc_cliente: num_doc_cliente
    }).then(()=>{
      listar();
      clear();
      Swal.fire({
        title: "<strong>Registro exitoso!!!</strong>",
        html: "<i>El servicio <strong>"+cod_servicio+"</strong>Fue Registrado con Exito!!!</i>",
        icon: 'success',
        timer: 3000
      })
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
  }

// Metodo Actualizar
  const update= () => {
    Axios.put("http://localhost:3001/update",{
      cod_servicio: cod_servicio,
      num_doc_cliente: num_doc_cliente
    }).then(()=>{
      listar();
      clear();
      Swal.fire({
        title: "<strong>Actualizacion Exitosa!!!</strong>",
        html: "<i> El servicio <strong>"+cod_servicio+"</strong>Fue Actualizado con Exito!!!</i>",
        icon: 'success',
        timer: 3000
      })
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
  }

// Metodo Eliminar
  const deleteUsu = (val)=>{
    Swal.fire({
      title: 'confirmar eliminado',
      html: "<i>Realmente deseas eliminar el servicio <strong>"+val.cod_servicio+"</strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    }).then((result) => {
      if(result.isConfirmed) {
        Axios.delete('http://localhost:3001/delete/${val.cod_servicio}').then((res)=>{
          listar();
          clear();
          Swal.fire({
            icon: 'success',
            title: val.nombre + 'confirmar eliminado.',
            showConfirmButton: false,
            timer: 2000
          });
        }).catch(function(error){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar a el servicio',
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    });
  }

// Limpiar Datos Formulario
  const clear = () => {
    setServicio("");
    setNum_doc_cliente("");
    setEditar(false);
  }

// Pasar Datos a Actualizar el formulario
  const editarServicio = (val) => {
    setEditar(true);
    setServicio(val.cod_reserva);
    setNum_doc_cliente(val.fecha_inicio);
  }

// Metodo Leer
  const listar = () => {
    Axios.get("http://localhost:3001/servicios_adicionales").then((Response)=>{
      setServicios_adicionales(Response.data);
    });
  }

//interfaz retornada al usuario
  return(
    <div className="container">
      <div className="card text-center"> 
        <div className="card-header">
          SERVICIOS ADICIONALES
        </div>

        <div className="card-body">
          <div className="formulario">
            <h3>Datos de servicios adicionales</h3>

              <div className='info'>
                <label>Codigo del servicio</label>
                <input type='text' onChange={(event) => { setServicio(event.target.value);}}
                className='form-control' value={cod_servicio}/>
              </div>

              <div className='info'>
                <label>Numero Documento Cliente</label>
                <input type='text' onChange={(event) => { setNum_doc_cliente(event.target.value);}}
                className='form-control' value={num_doc_cliente}/>
              </div>
          </div>

          <div className='card-footer text-muted'>
            {
              editar?
              <div>
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={clear}>Cancelar</button>
              </div>
              :<button className='btn btn-success' onClick={add}>Registrar</button>
            }
              <button className='btn btn-secondary' onClick={listar}>listar</button>
          </div>
        </div>
      </div>

      <div className='lista'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>cod_servicio</th>
              <th scope='col'>num_doc_cliente</th>
            </tr>
          </thead>

          <tbody>
            {
              usuariosList.map((val,key) => {
                return <tr key={val.cod_servicio}>
                  <th>{val.cod_servicio}</th>
                  <td>{val.num_doc_cliente}</td>
                  <td>
                    <div className='btn-group' role='group' aria-label='Basic example'>
                      <button type='button' onClick={() => {
                        editarServicio(val);
                      }}
                      className='btn btn-warning'>Actualizar</button>

                      <button type='button' onClick={() => {
                        deleteUsu(val);
                      }}
                      className='btn btn-danger'>Eliminar</button>
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