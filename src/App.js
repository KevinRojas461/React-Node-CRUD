// importar app.css
import './App.css';
// useEffect
// useEffect es un hook que te permite ejecutar efectos secundarios en tus componentes.
// Un efecto secundario puede ser una llamada a una API, actualizar el DOM,
// o incluso suscribirse a eventos.
// El código dentro de useEffect se ejecuta después de que el componente
// se ha renderizado o la pagina se ha actualizado/refrescado.

// useState
// useState es un hook que te permite añadir estado a tus componentes funcionales.
// Imagina que tienes una variable que quieres que cambie y recuerde su valor entre
// renderizados. useState te ayuda a hacer eso.
import { useState } from 'react';

// es una librería de js para hacer peticiones (req) de forma sencilla
import Axios from 'axios';

// importar todas las clases o componentes de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// librería para tener alertas bonitas y con animaciones como las de mudblazor 
import Swal from 'sweetalert2';

function App() {
  // constantes que nos permiten gestionar el estado
  // estado es que cada dato del formulario se guarde en una variable

  // el nombre por el momento es "" o no tiene nada
  // "" es el valor del nombre
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  // setPais es para asiganrle un valor a la varibale/constante "pais"
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  // const [id, setId] = useState(0);
  // sin el 0 para que no aparesca ceros en el formulario al actualizar
  // la pagina despues de editar
  const [id, setId] = useState();

  // para pasarle los datos del resgistro seleccionado al mismo formulario para crear
  // con eso vamos a saber si estamos editando o no (creando)

  // false es para que cuando se selecione un registro para editar
  // el boton de "Registar" cambie al boton de "Actualizar"
  // si se refresca la paginaa luego de editar vulve el boton
  // "Registar" porque esta en false por defecto
  const [editar, setEditar] = useState(false);

  // lista en donde se va a guardar los registros de los empleados
  // useState([]) empleadosList vamos a inicializar en una lista vacia
  // setEmpleados le asigana los registros de los empleados a empleadosList
  const [empleadosList, setEmpleados] = useState([]);

  // para que se muestre el nombre que se digito en el formulario en una alerta
  // <button onClick={mostrarDatos}>Registrar</button>
  // const mostrarDatos = ()=>{
  //   alert(nombre);
  // }

  // metodo para registrar
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      // le voy a enviar los aiguientes campos del fromulario:

      // nombre:nombre(const ["nombre", setNombre] = useState("");)
      // setNombre establece el valor de nombre
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
      // then => al final o luego de que enviemos los campos
    }).then(() => {
      // para que cuando se cree un nuevo registro se actualize la tabla
      // y muestre el registro nuevo y los viejos
      getEmpleados()
      // cuando termine de enviar los campos del formulario
      // se abra una lista de confirmacion 
      // alert("Empleado registrado");
      limpiarCampos()

      Swal.fire({
        title: "<strong>Resgistro exitoso!</strong>",
        // text: "El empleado <strong>"+nombre+"</strong> fue registrado con exitoso.",
        // html toma las etiquetas text no las las toma
        html: "<i>El empleado <strong>" + nombre + "</strong> fue registrado con exitoso.</i>",
        icon: "success"
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        // .message para que solo muestre una parte del error solo "message"
        // si message es Network Error entonces muestre el mensaje: (Intente mas tarde)
        // si no muestre message tal cual
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  }

  // editar
  const editarEmpleado = (val) => {
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    // const ["id", setId] = useState(0);
    // a la valiablese/constante "id" se le esta asignado el id que me pasa
    // el registro que se selecciono
    setId(val.id);
  }

  //
  const limpiarCampos = () => {
    // para que cada campo del formulario este limpio
    // luego de actualizar, cancelar o registrar
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setEditar(false);
  }

  // metodo para actualizar
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      // le voy a enviar los aiguientes campos del fromulario:

      // para actualizar se necesita el id para saber que registro se va a 
      // actualizar (pasarle al metodo update el id del registro que se selecciono)
      // id: "id", const ["id", setId] = useState();
      id: id,

      // nombre:nombre(const ["nombre", setNombre] = useState("");)
      // setNombre establece el valor de nombre
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
      // then => al final o luego de que enviemos los campos
    }).then(() => {
      // para que cuando se cree un nuevo registro se actualize la tabla
      // y muestre el registro nuevo y los viejos
      getEmpleados()
      // cuando termine de enviar los campos del formulario
      // se abra una lista de confirmacion 
      // alert("Empleado actualizado");
      limpiarCampos()

      //
      Swal.fire({
        title: "<strong>Actualizacion exitosa!</strong>",
        // text: "El empleado <strong>"+nombre+"</strong> fue registrado con exitoso.",
        // html toma las etiquetas text no las las toma
        html: "<i>El empleado <strong>" + nombre + "</strong> fue actualizado con exitoso.</i>",
        icon: "success"
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        // .message para que solo muestre una parte del error solo "message"
        // si message es Network Error entonces muestre el mensaje: (Intente mas tarde)
        // si no muestre message tal cual
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  }

  // metodo para ELIMINAR
  const deleteEmpleado = (val) => {
    //
    Swal.fire({
      title: "<strong>Confirmar eliminado!</strong>",
      // text: "El empleado <strong>"+nombre+"</strong> fue registrado con exitoso.",
      // html toma las etiquetas text no las las toma
      // "<i>Realmente desea eliminar el registro?</i>" => const deleteEmpleado = (id)
      html: "<i>Realmente desea eliminar a <strong>" + val.nombre + "</strong>?</i>",
      // icon: "success" es el  ✔  bien/correcto
      // icon: "warning" es el  !  advertencia
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!"
    }).then((result) => {
      // si el usu da que "Si" es true
      // y se confirma (isConfirmed) que se va a eliminar el registro
      // se elimina el registro y se abre la alerta que confirma que se
      // elimino el registro 
      if (result.isConfirmed) {
        // "http://localhost:3001/delete/"+id`
        // alt gr + }

        // para delete no es necesario enviarle todos los datos/campos de registro/objeto
        // seleccionado en el body solo el id en la url en forma de "parametro"
        // "const deleteEmpleado = (id)" => ${id}
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          // para que cuando se cree un nuevo registro se actualize la tabla
          // y muestre el registro nuevo y los viejos
          getEmpleados()
          // cuando termine de enviar los campos del formulario
          // se abra una lista de confirmacion 
          // alert("Empleado actualizado");
          limpiarCampos()

          // luego de que se confime que se va a eliminar el registro
          // si se abre la alerta
          Swal.fire({
            title: val.nombre + " fue eliminado correctamente.",
            icon: "success",
            // para que se elimine el "ok"
            showConfirmButton: false,
            // y con timer solo aparesca la alerta por unos segundo sin
            // tener que cerrarla manualmente dandole al boton ok "showConfirmButton"
            timer: 2000
          });
        }).catch(function(error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logro eliminar al empleado!",
            // .message para que solo muestre una parte del error solo "message"
            // si message es Network Error entonces muestre el mensaje: (Intente mas tarde)
            // si no muestre message tal cual
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
          });
        });
      }
    });
  }

  // metodo para listar
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados")
      // cuando se obtenga la respuesta se guarde en "res" 
      .then((res) => {
        // setEmpleados le asigna los registros de los empleados a la lista 
        // empleadosList

        // res.data trae todos los registros de la tabla empleados
        setEmpleados(res.data);
      });
  }

  // es para que cuando carge la pagina 
  getEmpleados();

  return (
    <div className="container">

      <div className="card text-center">
        <div className="card-header">
          GESTION DE EMPLEADOS
        </div>
        <div className="card-body">

          {/* Nombre */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text"
              /* cada uno de los campos va a tener un evento interno */
              /* event tiene la infromacion que el usu digito en el campo nombre */
              onChange={(event) => {
                // proceso que va a hacer cada que cambie el valor del campo "nombre"
                // o cada vez que se haga un registro nuevo

                // event.target.value trae el valor que se digito
                // en el campo nombre del formulario y se lo asigna a 
                // la variable/constante "nombre" (setNombre)
                setNombre(event.target.value);
              }}
              // ##### value={nombre} es pra ponerle los campos del registro
              // que se selecciono para editar
              value={nombre}
              className="form-control" placeholder="Ingrese el nombre" aria-label="nombre" aria-describedby="basic-addon1" />
          </div>

          {/* Edad */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="number"
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              value={edad}
              className="form-control" placeholder="Ingrese la edad" aria-label="edad" aria-describedby="basic-addon1" />
          </div>

          {/* Pais */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais:</span>
            <input type="text"
              onChange={(event) => {
                setPais(event.target.value);
              }}
              value={pais}
              className="form-control" placeholder="Ingrese el pais" aria-label="pais" aria-describedby="basic-addon1" />
          </div>

          {/* Cargo */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input type="text"
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              value={cargo}
              className="form-control" placeholder="Ingrese el cargo" aria-label="cargo" aria-describedby="basic-addon1" />
          </div>

          {/* Años */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años:</span>
            <input type="number"
              onChange={(event) => {
                setAnios(event.target.value);
              }}
              value={anios}
              className="form-control" placeholder="Ingrese los años" aria-label="años" aria-describedby="basic-addon1" />
          </div>
        </div>
        {/* BOTONES */}
        <div className="card-footer text-body-secondary">
          {
            // editar===true
            // si editar el true muestre el boton de actualizar
            editar ?
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
              </div>
              :
              <button className='btn btn-success m-2' onClick={add}>Registrar</button>
          }
        </div>
      </div>

      {/* table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NOMBRE</th>
            <th scope="col">EDAD</th>
            <th scope="col">PAIS</th>
            <th scope="col">CARGO</th>
            <th scope="col">AÑOS</th>
            <th scope="col">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {/* estraer los registros que vienen desde la api */}
          {
            // la tabla

            // cada valor tiene una clave
            // map es recorrer la lista empleadosList registro por registro
            empleadosList.map((val, key) => {
              // key cada elemento/campo tiene su respectivo id 
              return <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                      // val trae todos los campos del registro/objeto que
                      // se seleccino para editar pq "val" es cada registro de la lista
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                      className="btn btn-info">Editar</button>

                    <button type="button"
                      onClick={() => {
                        // val.id ya no trae todos los campos del registro/objeto que
                        // se selecciono solo trae el campo "id" del registro/objeto que
                        // se selecciono deleteEmpleado(val.id)
                        deleteEmpleado(val);
                      }}
                      className="btn btn-danger">Eliminar</button>
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
