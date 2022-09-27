import axios from "axios";

export default axios.create({
  baseURL: "https://areco.gob.ar:9531/api",
  headers: {
    
    "Content-type": "application/json"
  }
});