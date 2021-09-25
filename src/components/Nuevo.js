import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";

const AddTutorial = () => {
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
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
        acta:tutorial.acta,
        fecha:tutorial.fecha,
        nombre:tutorial.nombre,
        direccion:tutorial.direccion,
        codigoPostal:tutorial.codigoPostal,
        localidad:tutorial.localidad,
        provincia:tutorial.provincia,
        dni:tutorial.dni,
        descripcion:tutorial.descripcion,
        lugar:tutorial.lugar,
        vehiculo:tutorial.vehiculo,
        dominio:tutorial.dominio,
        agente:tutorial.agente,
        actoResolutorio:tutorial.actoResolutorio,
        fechaResolucion:tutorial.fechaResolucion,
        leyOrdenanza:tutorial.leyOrdenanza,
        articulo:tutorial.articulo,
        inciso:tutorial.inciso,
        comentario:tutorial.comentario,
        intervino:tutorial.intervino,
        valor:tutorial.valor
    };

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
            acta:response.data.acta,
            fecha:response.data.fecha,
            nombre:response.data.nombre,
            direccion:response.data.direccion,
            codigoPostal:response.data.codigoPostal,
            localidad:response.data.localidad,
            provincia:response.data.provincia,
            dni:response.data.dni,
            descripcion:response.data.descripcion,
            lugar:response.data.lugar,
            vehiculo:response.data.vehiculo,
            dominio:response.data.dominio,
            agente:response.data.agente,
            actoResolutorio:response.data.actoResolutorio,
            fechaResolucion:response.data.fechaResolucion,
            leyOrdenanza:response.data.leyOrdenanza,
            articulo:response.data.articulo,
            inciso:response.data.inciso,
            comentario:response.data.comentario,
            intervino:response.data.intervino,
            valor:response.data.valor
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div >
    {submitted ? (
      <div>
        <h4>You submitted successfully!</h4>
        <button className="btn btn-success" onClick={newTutorial}>
          Add
        </button>
      </div>
    ) : (
      <div>
          <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="acta">Acta</label>
                    <input
                        type="text"
                        className="form-control"
                        id="acta"
                        name="acta"
                        value={tutorial.acta}
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
                    value={tutorial.fecha}
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
                        value={tutorial.nombre}
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
                        value={tutorial.direccion}
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
                        value={tutorial.codigoPostal}
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
                        value={tutorial.localidad}
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
                        value={tutorial.provincia}
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
                        value={tutorial.dni}
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
                        value={tutorial.descripcion}
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
                        value={tutorial.lugar}
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
                        value={tutorial.vehiculo}
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
                        value={tutorial.dominio}
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
                        value={tutorial.agente}
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
                        value={tutorial.actoResolutorio}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="fechaResolucion"> Fecha Resolucion</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fechaResolucion"
                        name="fechaResolucion"
                        value={tutorial.fechaResolucion}
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
                        value={tutorial.leyOrdenanza}
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
                        value={tutorial.articulo}
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
                        value={tutorial.inciso}
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
                        value={tutorial.comentario}
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
                        value={tutorial.intervino}
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
                        value={tutorial.valor}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
            </div>

        

        <button onClick={saveTutorial} className="btn btn-success">
          Submit
        </button>
      </div>
    )}
  </div>
);
};

export default AddTutorial;

