import moment from "moment";
import React, { useState, useEffect } from "react";
import TutorialService from "../services/TutorialService";
import TutorialDataService from "../services/TutorialService";
import CurrencyInput from 'react-currency-input-field';
import TablaConvenio from "./TablaConvenio";

const Convenio = (props) => {
  const initialConvenioState = {

    id: 0,
    anticipo: 0,
    cant_cuotas: 0,
    valor_cuota: 0,
    cuotas: [],
    estado: false,
    nro_recibo: ""

  }
  const initialTutorialState = {
    id: null,
    acta: "",
    fecha: "",
    nombre: "",
    direccion: "",
    codigoPostal: "",
    localidad: "",
    provincia: "",
    dni: "",
    descripcion: "",
    lugar: "",
    vehiculo: "",
    motor: "",
    chasis: "",
    dominio: "",
    agente: "",
    actoResolutorio: "",
    fechaResolucion: "",
    leyOrdenanza: "",
    articulo: "",
    inciso: "",
    comentario: "",
    intervino: "",
    unidadValor: 0.00,
    valor: "",
    nombreTitular: "",
    direccionTitular: "",
    cpTitular: "",
    localidadTitular: "",
    provinciaTitular: "",
    dniTitular: "",
    convenio: ""

  };


  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [currentConvenio, setCurrentConvenio] = useState(initialConvenioState);
  const [currentCuotas, setCurrentCuotas] = useState([]);
  const [interes, setInteres] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [isConvenio, setisConvenio] = useState(null);

  const cuotasNuevas = () => {

    let valorCuota = 0

    valorCuota = ((parseFloat(currentTutorial.valor.replace(',', '.')) - currentConvenio.anticipo) * (1 + (interes / 100))) / currentConvenio.cant_cuotas;
    setCurrentConvenio({ ...currentConvenio, valor_cuota: valorCuota.toFixed(2) })
    console.log(valorCuota);

    if (isConvenio) {
      console.log("tiene convenio")
    } else {
      setCurrentCuotas([])
      if (currentConvenio.anticipo === 0) {

        for (let index = 0; index < currentConvenio.cant_cuotas; index++) {
          setCurrentCuotas(oldArray => [...oldArray, {
            id: 0,
            fecha_pago: moment().add(index, "months").format("YYYY-MM-DD"),
            nro_recibo: "",
            estado: false

          }])

        }
      } else {
        for (let index = 1; index <= currentConvenio.cant_cuotas; index++) {
          setCurrentCuotas(oldArray => [...oldArray, {
            id: 0,
            fecha_pago: moment().add(index, "months").format("YYYY-MM-DD"),
            nro_recibo: "",
            estado: false

          }])

        }
      }

    }

  }
  useEffect(() => {
    console.log("EffectCuotas", currentCuotas)
    setCurrentConvenio({ ...currentConvenio, cuotas: currentCuotas })
  }, [currentCuotas]);

  useEffect(() => {
    console.log("EffectConvenio", currentConvenio)
    setCurrentTutorial({ ...currentTutorial, convenio: currentConvenio })
  }, [currentConvenio]);

  useEffect(() => {
    console.log("EffectTutorial", currentTutorial)
    //updateTutorial()
  }, [currentTutorial]);

  /*useEffect(() => {
    console.log("Effectcuotas",currentCuotas)
    console.log("EffectConvenio",currentConvenio)
    console.log("EffectInfracciones",currentTutorial)
   }, [currentCuotas,currentConvenio,currentTutorial]);*/

  const updateCuotas = (e) => {
    console.log("recibido", e)
    setCurrentCuotas(e)
  }

  const updateConvenio = (e) => {
    console.log("recibidoConvenio", e)
    setCurrentConvenio(e)
  }

  const printConvenio = () => {
    TutorialService.conveniopdf(currentTutorial.id);
  }

  const updateTutorial = () => {
    setSubmitting(true)
    var data = {
      acta: currentTutorial.acta,
      fecha: currentTutorial.fecha,
      nombre: currentTutorial.nombre,
      direccion: currentTutorial.direccion,
      codigoPostal: currentTutorial.codigoPostal,
      localidad: currentTutorial.localidad,
      provincia: currentTutorial.provincia,
      dni: currentTutorial.dni,
      descripcion: currentTutorial.descripcion,
      lugar: currentTutorial.lugar,
      vehiculo: currentTutorial.vehiculo,
      dominio: currentTutorial.dominio,
      agente: currentTutorial.agente,
      actoResolutorio: currentTutorial.actoResolutorio,
      fechaResolucion: currentTutorial.fechaResolucion,
      leyOrdenanza: currentTutorial.leyOrdenanza,
      articulo: currentTutorial.articulo,
      inciso: currentTutorial.inciso,
      comentario: currentTutorial.comentario,
      intervino: currentTutorial.intervino,
      valor: parseFloat(currentTutorial.valor.replace(',', '.')),
      unidadValor: currentTutorial.unidadValor,
      nombreTitular: currentTutorial.nombreTitular,
      direccionTitular: currentTutorial.direccionTitular,
      cpTitular: currentTutorial.cpTitular,
      localidadTitular: currentTutorial.localidadTitular,
      provinciaTitular: currentTutorial.provinciaTitular,
      dniTitular: currentTutorial.dniTitular,
      chasis: currentTutorial.chasis,
      motor: currentTutorial.motor,
      causa: currentTutorial.causa

    };
    TutorialDataService.update(currentTutorial.id, data)
      .then(response => {
        console.log("response ", response.data);
        setMessage("Actualizacion exitosa !");
        setSubmitting(false)
      })
      .catch(e => {
        console.log(e);
      });
  }
  const updateTutorialCuotas = () => {
    setSubmitting(true)
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then(response => {
        console.log("response ", response.data);
        setMessage("Actualizacion exitosa !");
        setSubmitting(false)
        window.location.reload()
      })
      .catch(e => {
        console.log(e);
      });
  }
  const getTutorial = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
        if (response.data.convenio) {
          setCurrentConvenio(response.data.convenio);
          setisConvenio(true);
        } else setisConvenio(false);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);


  const handleInputChangeInteres = event => {
    setInteres(event.target.value);
    console.log(event.target.value)
  }

  const handleInputChangeConvenio = event => {
    const { name, value } = event.target;
    console.log(event.target.value)
    setCurrentConvenio({ ...currentConvenio, [name]: value });
  };
  const handleInputChangeValorCuota = (name, value) => {
    console.log(name, value)
    //console.log(parseFloat(value.replace(',', '.')));
    setCurrentTutorial({ ...currentConvenio, [name]: value });
  };

  const handleInputChangeValor = (name, value) => {
    console.log(name, value)
    console.log(parseFloat(value.replace(',', '.')));
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };
  const recibocuotaspdf = () => {
    const id = props.match.params.id
    TutorialDataService.recibopdfcuotas(id);
  }

  const reciboanticipopdf = () => {
    const id = props.match.params.id
    TutorialDataService.recibopdfanticipo(id);
  }
  console.log(isSubmitting)
  console.log("convenio", isConvenio)
  if (isConvenio === null) { return null }
  else {
    return (
      <div>
        <h4>Convenio</h4>
        {currentTutorial && !isConvenio && <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="valor">Valor</label>
              <CurrencyInput
                className="form-control"
                fixedDecimalLength={2}
                id="valor"
                name="valor"
                value={currentTutorial.valor}

                decimalsLimit={2}
                onValueChange={(value, name) => handleInputChangeValor(name, value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="anticipo">Anticipo</label>
              <input
                type="number"
                className="form-control"
                id="anticipo"
                name="anticipo"
                value={currentConvenio.anticipo}
                onChange={handleInputChangeConvenio}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="cant_cuotas">Cantidad cuotas</label>
              <input
                type="number"
                className="form-control"
                id="cant_cuotas"
                name="cant_cuotas"
                value={currentConvenio.cant_cuotas}
                onChange={handleInputChangeConvenio}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="interes">Interes anual</label>
              <input
                step="0.01"
                type="number"
                className="form-control"
                id="interes"
                name="interes"
                value={interes}
                onChange={handleInputChangeInteres}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="valor_cuota">Valor de la cuota </label>
              <CurrencyInput
                disabled
                className="form-control"
                fixedDecimalLength={2}
                id="valor_cuota"
                name="valor_cuota"
                value={currentConvenio.valor_cuota}

                decimalsLimit={2}
                onValueChange={(value, name) => handleInputChangeValorCuota(name, value)}
              />

            </div>
          </div>
        </div>}
        {currentTutorial && !isConvenio && <button
          className="my-2"
          type="submit"

          style={{ width: "100%", background: "rgba(226,214,130, 0.89)" }}
          onClick={cuotasNuevas}
        >
          Calcular cuota
        </button>}
        {currentTutorial && !isConvenio &&
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ width: "100%", background: "rgba(153, 198, 187, 0.89)" }}
              onClick={updateTutorialCuotas}
            >
              {isSubmitting ? 'Enviando' : 'Actualizar'}
            </button>
            <p>{message}</p>
          </div>}
        {isConvenio && <TablaConvenio
          cuotas={currentTutorial.convenio.cuotas}
          valor={currentTutorial.convenio.valor_cuota}
          updateCuota={updateCuotas}
          submit={isSubmitting} msj={message}
          updateCuotas={updateTutorial}
          recibocuotas={recibocuotaspdf}
          convenio={currentConvenio}
          printconvenio={printConvenio}
          reciboanticipo={reciboanticipopdf}
          updateConvenio={updateConvenio}
        />}
      </div>

    )
  }
}
export default Convenio