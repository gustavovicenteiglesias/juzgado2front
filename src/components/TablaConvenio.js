import React ,{useState,useEffect}from "react";
import TutorialDataService from "../services/TutorialService";
import { Table ,Form, Col, Container} from "react-bootstrap";
import moment from "moment";
import ReactTooltip from "react-tooltip";

const TablaConvenio=(props)=>{
  const initialConvenioState={
    id: 0,
    anticipo: 0,
    cant_cuotas: 0,
    valor_cuota: 0,
    cuotas:[],
    estado:false,
    nro_recibo: ""
    }
    
    const [cuotas,setCuotas]=useState([]);
    const[convenio,setConvenio]=useState(initialConvenioState);
    const [isdisable,setIsDisable]=useState([])
    const [isdisableConvenio,setIsDisableConvenio]=useState(true)
    useEffect(() => {
       setCuotas(props.cuotas);
       props.cuotas.map((data,i)=> setIsDisable(oldArray => [...oldArray, true]))
      }, []);

      useEffect(() => {
        setConvenio(props.convenio);
       }, [props.convenio]);

     const handleInputChangeCheckConvenio = (event) => {
         setConvenio({...convenio,estado:event.target.checked})
      }; 
      const handleInputChangeConvenio=(event)=>{
        const { name, value } = event.target;
        setConvenio({...convenio,[name]:value})
      }
      const handleInputChangeCheck = (id)=>event => {
         let newArr = [...cuotas]; // copying the old datas array
            newArr[id] = {...newArr[id],estado:event.target.checked}; // replace e.target.value with whatever you want to change it to
            setCuotas(newArr)
      };
      const handleInputChange = (id)=>event => {
        const { name, value } = event.target;
        console.log(event.target.value)
        let newArr = [...cuotas]; // copying the old datas array
            newArr[id] = {...newArr[id],[name]:value}; // replace e.target.value with whatever you want to change it to
            setCuotas(newArr)
      };

      const editCuota=(id)=>{
            let newArr = [...isdisable]; // copying the old datas array
            newArr[id] = false; // replace e.target.value with whatever you want to change it to
            setIsDisable(newArr)
       }

      const postCuota=(id)=>{
        console.log("sumar",cuotas[id])
            let newArr = [...isdisable]; // copying the old datas array
            newArr[id] = true; // replace e.target.value with whatever you want to change it to
            setIsDisable(newArr)
            props.updateCuota(cuotas)
      }
      const postConvenio=()=>{
        
        setIsDisableConvenio(true)
        props.updateConvenio(convenio);
      }
      
     const  updateCuotas=()=>{
         console.log("Actualizar Cuotas",cuotas)
         props.updateCuota(cuotas)
     }
     console.log("cuotas",cuotas)
     console.log("convenio",convenio)
return(
    <div>
    <Table >

  <thead>
    <tr>
      <th>Cuota</th>
      <th>Fecha</th>
      <th>Nro. Recibo</th>
      <th>Estado</th>
      <th>Valor</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
      {convenio.anticipo===0?null:<tr>
        <td>Anticipo</td>
        <td >
                    <div className="form-group" >
                    <input
                        disabled
                        type="date"
                        className="form-control"
                        id="fecha_pago"
                        name="fecha_pago"
                        value={moment(props.cuotas[0].fecha_pago).subtract(1,"months").format("YYYY-MM-DD")}
                        
                    />
                    </div>
                    </td>
            <td ><div className="form-group" >
                    <input
                        style={{minWidth:"100px"}}
                        disabled={isdisableConvenio}
                        type="number"
                        className="form-control"
                        id="nro_recibo"
                        name="nro_recibo"
                        value={convenio.nro_recibo}
                        onChange={handleInputChangeConvenio}
                    />
                    </div> 
                    </td>
            <td > <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check 
                        disabled={isdisableConvenio}
                        type="checkbox" 
                        label="Pagado " 
                        name="estado"
                        checked={convenio.estado}
                        onChange={handleInputChangeCheckConvenio}
                        />
                    </Form.Group></td>
            <td > {convenio.anticipo}</td>
             {isdisableConvenio && <td>
                <span onClick={()=> setIsDisableConvenio(false)} data-tip data-for="editar">
               <i className="far fa-edit action mr-2"></i>
              </span>
              
              <ReactTooltip id="editar" place="top" effect="solid">
               Editar
              </ReactTooltip>
              
              <span style={{color:"green"}} onClick={props.reciboanticipo} data-tip data-for="recibo">
                <i className="fas fa-file-invoice-dollar action mr-2"></i>
                </span>
                <ReactTooltip id="recibo" place="top" effect="solid">
               Recibo
              </ReactTooltip>
              </td>}
              {!isdisableConvenio &&<td>
                <span onClick={postConvenio} data-tip data-for="post">
               <i className="fas fa-plus action mr-2"></i>
              </span>
              <ReactTooltip id="post" place="top" effect="solid">
              Grabar
              </ReactTooltip>
              </td>}
      </tr>}
      {cuotas.map((data,i)=>{
          return(
            
            <tr key={i}>
            <td >{i+1}</td>
            <td >
                    <div className="form-group" >
                    <input
                        disabled={isdisable[i]}
                        type="date"
                        className="form-control"
                        id="fecha_pago"
                        name="fecha_pago"
                        value={moment(data.fecha_pago).format("YYYY-MM-DD")}
                        onChange={handleInputChange(i)}
                    />
                    </div>
                    </td>
            <td ><div className="form-group" >
                    <input
                        style={{minWidth:"100px"}}
                        disabled={isdisable[i]}
                        type="number"
                        className="form-control"
                        id="nro_recibo"
                        name="nro_recibo"
                        value={data.nro_recibo}
                        onChange={handleInputChange(i)}
                    />
                    </div> 
                    </td>
            <td > <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check 
                        disabled={isdisable[i]}
                        type="checkbox" 
                        label="Pagado " 
                        name="estado"
                        checked={data.estado}
                        onChange={handleInputChangeCheck(i)}
                        />
                    </Form.Group></td>
            <td > {props.valor}</td>
            {isdisable[i] && <td>
                <span onClick={() => editCuota(i)} data-tip data-for="editar">
               <i className="far fa-edit action mr-2"></i>
              </span>
              <span style={{color:"green"}} onClick={props.recibocuotas} data-tip data-for="recibo">
                <i className="fas fa-file-invoice-dollar action mr-2"></i>
                </span>
              </td>}
              {!isdisable[i] &&<td>
                <span onClick={() => postCuota(i)} data-tip data-for="post">
               <i className="fas fa-plus action mr-2"></i>
              </span>
               
              </td>}
              

            </tr>
            
          )
      })}
    
    
  </tbody>
        
</Table>
        <button
          className="mb-2"
           style={{width:"100%", background: "rgba(168, 32, 74, 0.30)"}}
            onClick={(props.printconvenio)}
        >
          Imprimir Convenio
        </button>
        <button
            type="submit"
            disabled={props.submit}
            style={{width:"100%", background: "rgba(153, 198, 187, 0.89)"}}
            onClick={(props.updateCuotas)}
        >
        {props.submit? 'Enviando' : 'Actualizar'}
        </button>
        <p>{props.msj}</p>
              
    </div>
    
)
}
export default TablaConvenio