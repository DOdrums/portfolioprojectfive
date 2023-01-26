import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
// axios.defaults.baseURL = "https://melo-api.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = false;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
