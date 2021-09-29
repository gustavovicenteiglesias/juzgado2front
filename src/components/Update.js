import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";


const Tutorial = props => {
  const initialTutorialState = {
    id: null,
    acta:"",
    fecha:"",
    nombre:"",
    direccion:"",
    codigoPostal:"",
    localidad:"",
    provincia:"",
    dni:"",
    descripcion:"",
    lugar:"",
    vehiculo:"",
    dominio:"",
    agente:"",
    actoResolutorio:"",
    fechaResolucion:"",
    leyOrdenanza:"",
    articulo:"",
    inciso:"",
    comentario:"",
    intervino:"",
    valor:""

  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const getTutorial = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  /*const updatePublished = status => {
    var data = {
        id: currentTutorial.id,
        acta:currentTutorial.acta,
        fecha:currentTutorial.fecha,
        nombre:currentTutorial.nombre,
        direccion:currentTutorial.direccion,
        codigoPostal:currentTutorial.codigoPostal,
        localidad:currentTutorial.localidad,
        provincia:currentTutorial.provincia,
        dni:currentTutorial.dni,
        descripcion:currentTutorial.descripcion,
        lugar:currentTutorial.lugar,
        vehiculo:currentTutorial.vehiculo,
        dominio:currentTutorial.dominio,
        agente:currentTutorial.agente,
        actoResolutorio:currentTutorial.actoResolutorio,
        fechaResolucion:currentTutorial.fechaResolucion,
        leyOrdenanza:currentTutorial.leyOrdenanza,
        articulo:currentTutorial.articulo,
        inciso:currentTutorial.inciso,
        comentario:currentTutorial.comentario,
        intervino:currentTutorial.intervino,
        valor:currentTutorial.valor
      
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then(response => {
        
        console.log(response.data);
        setMessage("La actualizacion a sido exitosa!");
      })
      .catch(e => {
        console.log(e);
      });
  };*/

  const updateTutorial = () => {
      setSubmitting(true)
     
      console.log(currentTutorial.fecha.split("T",0))
      console.log(currentTutorial)
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then(response => {
        console.log("response ",response.data);
        setMessage("Actualizacion exitosa !");
        setSubmitting(false)
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div >
          <h4>Infracciones</h4>
          <form>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="acta">Acta</label>
                    <input
                        type="text"
                        className="form-control"
                        id="acta"
                        name="acta"
                        value={currentTutorial.acta}
                        onChange={handleInputChange}
                    />
                    </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                <label htmlFor="fecha">Fecha</label>
                <input
                    type="date"
                    className="form-control"
                    id="fecha"
                    name="fecha"
                    value={currentTutorial.fecha}
                    onChange={handleInputChange}
                />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={currentTutorial.nombre}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="direccion">Direccion</label>
                    <input
                        type="text"
                        className="form-control"
                        id="direccion"
                        name="direccion"
                        value={currentTutorial.direccion}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="codigoPostal">Codigo Postal</label>
                    <input
                        type="text"
                        className="form-control"
                        id="codigoPostal"
                        name="codigoPostal"
                        value={currentTutorial.codigoPostal}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="localidad">Localidad</label>
                    <input
                        type="text"
                        className="form-control"
                        id="localidad"
                        name="localidad"
                        value={currentTutorial.localidad}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="provincia">Provincia</label>
                    <input
                        type="text"
                        className="form-control"
                        id="provincia"
                        name="provincia"
                        value={currentTutorial.provincia}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="dni"> CUIT o DNI</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dni"
                        name="dni"
                        value={currentTutorial.dni}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="descripcion"> Descripcion</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        value={currentTutorial.descripcion}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="lugar">  Lugar Infraccion</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lugar"
                        name="lugar"
                        value={currentTutorial.lugar}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="vehiculo">Vehiculo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="vehiculo"
                        name="vehiculo"
                        value={currentTutorial.vehiculo}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="dominio">Dominio</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dominio"
                        name="dominio"
                        value={currentTutorial.dominio}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="agente">Agente</label>
                    <input
                        type="text"
                        className="form-control"
                        id="agente"
                        name="agente"
                        value={currentTutorial.agente}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="actoResolutorio">Resolucion</label>
                    <input
                        type="text"
                        className="form-control"
                        id="actoResolutorio"
                        name="actoResolutorio"
                        value={currentTutorial.actoResolutorio}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="fechaResolucion"> Fecha Resolucion</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fechaResolucion"
                        name="fechaResolucion"
                        value={currentTutorial.fechaResolucion}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="leyOrdenanza"> Ley/Ordenanza</label>
                    <input
                        type="text"
                        className="form-control"
                        id="leyOrdenanza"
                        name="leyOrdenanza"
                        value={currentTutorial.leyOrdenanza}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="articulo"> Articulo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="articulo"
                        name="articulo"
                        value={currentTutorial.articulo}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="inciso">Inciso</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inciso"
                        name="inciso"
                        value={currentTutorial.inciso}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="comentario">Comentario</label>
                    <input
                        type="text"
                        className="form-control"
                        id="comentario"
                        name="comentario"
                        value={currentTutorial.comentario}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="intervino">Intervino</label>
                    <input
                        type="text"
                        className="form-control"
                        id="intervino"
                        name="intervino"
                        value={currentTutorial.intervino}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="valor">Valor</label>
                    <input
                        type="text"
                        className="form-control"
                        id="valor"
                        name="valor"
                        value={currentTutorial.valor}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
            </div>
          </form>
          {/*<button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
      </button>*/}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{width:"100%", background: "rgba(153, 198, 187, 0.89)"}}
            onClick={updateTutorial}
          >
           {isSubmitting ? 'Enviando' : 'Actualizar'}
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
