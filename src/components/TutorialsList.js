import React, { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import TutorialDataService from "../services/TutorialService";
import { useTable, useBlockLayout, useResizeColumns  } from "react-table";
import swal from 'sweetalert';
import { Styles } from "./style";
import AuthService from "../services/auth.service";
import Loader from "react-loader-spinner";
import ReactTooltip from "react-tooltip";





const TutorialsList = (props) => {
  const [tutorials, setTutorials] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tutorialsRef = useRef();
  const [buscar, setBuscar] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const[showModeratorBoard,setShowModeratorBoard]=useState(false);
  const[showAdminBoard,setShowAdminBoard]=useState(false);
  //const[showUserBoard,setShowUserBoard]=useState(false);
  const[currentUser,setCurrentUser]=useState(undefined);
  const[loading,setLoading]=useState(false);
 
  

  useEffect(() => {
    const user= AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowModeratorBoard(user.roles.includes("ROLE_ADMIN"));
     
    }
  }, []);
  /*console.log(showAdminBoard)
  console.log(AuthService.getCurrentUser())
  console.log("currentUser",currentUser)*/
  const pageSizes = [5,10,15];

  tutorialsRef.current = tutorials;

  const onChangeSearchTitle = (e) => {
    if (e.key==="Enter") findByTitle()
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getRequestParams = (searchTitle,campo, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }
    if (campo) {
      params["campo"] = campo;
    }
    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveTutorials = () => {
    setLoading(true);
    const params = getRequestParams(searchTitle,buscar, page, pageSize);
    //console.log(params);
    TutorialDataService.getAll(params)
      .then((response) => {
        const { tutorials, totalPages } = response.data;
        setLoading(false);
        setTutorials(tutorials);
        setCount(totalPages);

        //console.log("recibido",response.data);
      })
      .catch((e) => {
        //console.log(e);
        swal(
           {
            text:"¡Ups no se podido realizar tu consulta !",
          icon: 'warning',
        }).then((result)=>{
          if(result){window.location.reload()}
         })
      });
  };

  useEffect(retrieveTutorials, [page, pageSize]);

  const oficiopdf=(rowIndex)=>{
    const id = tutorialsRef.current[rowIndex].id;
    TutorialDataService.oficiopdf(id);
   
  }

  const cedulapdf=(rowIndex)=>{
    const id = tutorialsRef.current[rowIndex].id;
    TutorialDataService.cedulapdf(id);
   
  }
  const recibopdf=(rowIndex)=>{
    const id = tutorialsRef.current[rowIndex].id;
    TutorialDataService.recibopdf(id);
   
  }

  const cedulatitularpdf=(rowIndex)=>{
    const id = tutorialsRef.current[rowIndex].id;
    TutorialDataService.cedulatitularpdf(id);
   
  }
  const portadapdf=(rowIndex)=>{
    const id = tutorialsRef.current[rowIndex].id;
    TutorialDataService.portadapdf(id);
   
  }

  const findByTitleEnter = (event) => {
    if (event.key === 'Enter') {
      setPage(1);
    retrieveTutorials();
    }
    
  };

  const findByTitle = () => {
    
    setPage(1);
    retrieveTutorials();
  };

  const openTutorial = (rowIndex) => {
    const id = tutorialsRef.current[rowIndex].id;

    props.history.push("/tutorials/" + id);
  };

  const deleteTutorial = (rowIndex) => {
   
    swal({
      title: "Estas seguro?",
      text: "Una vez eliminado, ¡no podrá recuperar este archivo !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const id = tutorialsRef.current[rowIndex].id;

    TutorialDataService.remove(id)
      .then((response) => {
        swal("¡Tu archivo ha sido eliminado!", {
          icon: "success",
        });
        props.history.push("/tutorials");

        let newTutorials = [...tutorialsRef.current];
        newTutorials.splice(rowIndex, 1);

        setTutorials(newTutorials);
      })
      .catch((e) => {
        //console.log(e);
      });
        
      } else {
        swal("Tu archivo  está a salvo!");
      }
    });
    
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleBuscar=(event)=>{
    //console.log(event.target.value)
    setBuscar(event.target.value)
  }
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };
  const busqueda=[
    {
      Header: "Causa",
      accessor: "causa",
    }
     ,
    {
      Header: "Nombre",
      accessor: "nombre",
    },
    {
      Header: "CUIT o DNI",
      accessor: "dni",
    },
    {
      Header: "Nro Acta",
      accessor: "acta",
      
    },
    {
      Header: "Dominio",
      accessor: "dominio",
    },



  ]
  const columns = useMemo(
    () => [
      {
        Header: "Nro Causa",
        accessor: "causa",
        width:100
        
      },
      {
        Header: "Nro Acta",
        accessor: "acta",
        width:100
      },
      {
        Header: "Fecha",
        accessor: "fecha",
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Direccion",
        accessor: "direccion",
      },
      {
        Header: "Codigo Postal",
        accessor: "codigoPostal",
      },
      {
        Header: "Localidad",
        accessor: "localidad",
      },
      {
        Header: "Provincia",
        accessor: "provincia",
      },
      {
        Header: "CUIT o DNI",
        accessor: "dni",
      },
      
      {
        Header: "Nombre Titular",
        accessor: "nombreTitular",
      },
      {
        Header: "Direccion Titular",
        accessor: "direccionTitular",
      },
      {
        Header: "Codigo Postal Titular",
        accessor: "cpTitular",
      },
      {
        Header: "Localidad Titular",
        accessor: "localidadTitular",
      },
      {
        Header: "Provincia Titular",
        accessor: "provinciaTitular",
      },
      {
        Header: "CUIT o DNI Titular",
        accessor: "dniTitular",
      },
      {
        Header: "Descripcion",
        accessor: "descripcion",
      },
      {
        Header: "Lugar Infraccion",
        accessor: "lugar",
      },
     
      
      {
        Header: "Vehiculo",
        accessor: "vehiculo",
      },
      {
        Header: "Motor",
        accessor: "motor",
      },
      {
        Header: "Chasis",
        accessor: "chasis",
      },
      {
        Header: "Dominio",
        accessor: "dominio",
      },
      {
        Header: "Agente",
        accessor: "agente",
      },
      {
        Header: "Resolucion",
        accessor: "actoResolutorio",
      },
      {
        Header: "Fecha Resolucion",
        accessor: "fechaResolucion",
      },
      {
        Header: "Ley/Ordenanza",
        accessor: "leyOrdenanza",
      },
      {
        Header: "Articulo",
        accessor: "articulo",
      },
      {
        Header: "Inciso",
        accessor: "inciso",
      },
      {
        Header: "Comentario",
        accessor: "comentario",
      },
      {
        Header: "Intervino",
        accessor: "intervino",
      },
      {
        Header: "Valor",
        accessor: "valor",
      },
     
      {
        
        Header: "Acciones",
        accessor: "actions",
        width:180,
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
           
            <div>
               { showAdminBoard && <span style={{color:"green"}} onClick={() => recibopdf(rowIdx)} data-tip data-for="recibo">
              <i className="fas fa-file-invoice-dollar action mr-2"></i>

                  </span>
        }
                { showAdminBoard && <span style={{color:"blue"}} onClick={() => oficiopdf(rowIdx)} data-tip data-for="oficioPdf" >
              <i className="fas fa-balance-scale action mr-2" ></i>
                  </span>
                  
        }
                 { showAdminBoard && <span style={{color:"red"}} onClick={() => cedulatitularpdf(rowIdx)} data-tip data-for="cedulaTitular" >
              <i className="far fa-envelope action mr-2" ></i>
                  </span>
                  
        }
             { showAdminBoard && <span onClick={() => cedulapdf(rowIdx)} data-tip data-for="cedula">
              <i className="far fa-envelope action mr-2"></i>
                  </span>
        }
            { showAdminBoard && <span onClick={() => portadapdf(rowIdx)} data-tip data-for="portada">
              <i className="far fa-file-alt action mr-2"></i>
                  </span>
        }
            { showAdminBoard && <span onClick={() => openTutorial(rowIdx)} data-tip data-for="editar">
               <i className="far fa-edit action mr-2"></i>
              </span>}

             { showAdminBoard &&  <span onClick={() => deleteTutorial(rowIdx)} data-tip data-for="borrar">
             <i className="fas fa-trash action"></i>
              </span> }
              <ReactTooltip id="recibo" place="top" effect="solid">
                Recibo
              </ReactTooltip>
              <ReactTooltip id="oficioPdf" place="top" effect="solid">
                Oficio
              </ReactTooltip>
              <ReactTooltip id="cedulaTitular" place="top" effect="solid">
                Cedula titular
              </ReactTooltip>
              <ReactTooltip id="cedula" place="top" effect="solid">
                Cedula 
              </ReactTooltip>
              <ReactTooltip id="portada" place="top" effect="solid">
                Portada
              </ReactTooltip>
              <ReactTooltip id="editar" place="top" effect="solid">
                Editar 
              </ReactTooltip>
              <ReactTooltip id="borrar" place="top" effect="solid">
                Borrar
              </ReactTooltip>
         
         
              
            </div>

          );
        },
      },
    ],
    [showAdminBoard]
  );
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    allColumns,
    getToggleHideAllColumnsProps,
    rows,
    prepareRow,
    setHiddenColumns,
    resetResizing,
  } = useTable({
    columns,
    data: tutorials,
    defaultColumn,
    initialState:{
      hiddenColumns:["fecha",
      "direccion",
      "codigoPostal",
      "localidad",
      "provincia",
      "descripcion",
      "agente",
      "actoResolutorio",
      "fechaResolucion",
      "leyOrdenanza",
      "articulo",
      "inciso",
      "comentario",
      "intervino",
      "valor",
      "nombreTitular",
      "direccionTitular",
      "cpTitular",
      "localidadTitular",
      "provinciaTitular",
      "dniTitular",
      "lugar",
      "motor",
      
      "chasis"
    ]
    }
  },
  useBlockLayout,
  useResizeColumns
  );

  return (
    
    <Styles>
         <div className="list row">

      <div className="col-md-6 ">
      <select className=" form-select-lg mb-3 " style={{width:"100%",height:"38px"}}  onClick={handleBuscar}>
        <option selected>Selecciona por que item vas a buscar  </option>
        {busqueda.map((search, i) => {
          return(
            <option key={i} value={search.accessor}>{search.Header}</option>
          )
          
        })
        }
      </select>
      </div>
      <div className="col-md-6">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={"Buscar por "+buscar}
            value={searchTitle}
            onKeyDown={findByTitleEnter}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-12 list">
        <div className="mt-3">
          {"Items por Pagina: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>
        <div>
       
        <div className="row">
        {allColumns.map(column => (
          
          <div key={column.id} className="col-md-2">
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.Header}
              
            </label>
         
          </div>
        ))}
         </div>
        <br />
      </div>  
     
     
        <div {...getTableProps()} className="table ">
          <div>
            {headerGroups.map(headerGroup => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map(column => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render('Header')}
                    {/* Use column.getResizerProps to hook up the events correctly */}
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? 'isResizing' : ''
                      }`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

         { loading?(
             <Loader
             type="Watch"
             color="#00BFFF"
             height={100}
             width={100}
             
           />
          ):
          (<div {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <div {...row.getRowProps()} className="tr">
                  {row.cells.map(cell => {
                    return (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render('Cell')}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>)}
        </div>
      
     
      </div>

    
      
    
    </div>
    </Styles>
    
  );
};

export default TutorialsList;
