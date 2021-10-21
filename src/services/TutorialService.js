import http from "./http-common";
import authHeader from './auth-header';

const getAll = (params) => {
  let config = {
    headers:authHeader() ,
    params
  }
  return http.get("/infraciones",config );
};

const cedulapdf=async (id)=>{
  try {
    const response = await http.get(`/cedula/${id}`, {
      headers: authHeader(),
      responseType: 'blob'
    });
    //Create a Blob from the PDF Stream
    const file = new Blob(
      [response.data],
      { type: 'application/pdf' });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
  } catch (error) {
   // console.log(error);
  }
}

const oficiopdf=async (id)=>{
  try {
    const response = await http.get(`/oficio/${id}`, {
      headers: authHeader(),
      responseType: 'blob'
    });
    //Create a Blob from the PDF Stream
    const file = new Blob(
      [response.data],
      { type: 'application/pdf' });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
  } catch (error) {
    //console.log(error);
  }
}

const cedulatitularpdf=async (id)=>{
  try {
    const response = await http.get(`/cedulatitular/${id}`, {
      headers: authHeader(),
      responseType: 'blob'
    });
    //Create a Blob from the PDF Stream
    const file = new Blob(
      [response.data],
      { type: 'application/pdf' });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
  } catch (error) {
    //console.log(error);
  }
}
const portadapdf=async (id)=>{
  try {
    const response = await http.get(`/portada/${id}`, {
      headers: authHeader(),
      responseType: 'blob'
    });
    //Create a Blob from the PDF Stream
    const file = new Blob(
      [response.data],
      { type: 'application/pdf' });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
  } catch (error) {
    //console.log(error);
  }
}

const get = (id) => {
  return http.get(`/infraciones/${id}`,{ headers: authHeader() });
};

const create = (data) => {
  return http.post("/infraciones", data,{ headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/infraciones/${id}`, data,{ headers: authHeader() });
};

const remove = (id) => {
  return http.delete(`/infraciones/${id}`,{ headers: authHeader() });
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = (title) => {
  return http.get(`/tutorials?title=${title}`,{ headers: authHeader() });
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  cedulapdf,
  portadapdf,
  cedulatitularpdf,
  oficiopdf
};

export default TutorialService;
