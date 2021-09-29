import http from "./http-common";
import authHeader from './auth-header';

const getAll = (params) => {
  let config = {
    headers:authHeader() ,
    params
  }
  return http.get("/infraciones",config );
};

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
};

export default TutorialService;
