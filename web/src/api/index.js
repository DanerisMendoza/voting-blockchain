import axios from "axios";

const URL = "http://127.0.0.1:8000/";

const instance = axios.create({
  baseURL: URL,
  withCredentials: false,
});

instance.interceptors.request.use(
  function (request) {
    request.headers.common["Content-Type"] = "application/json,text/html";
    request.headers.common["Accept"] = "Application/json";
    request.headers.common["Authorization"] =
      "Bearer " +
      (sessionStorage.getItem("vb-token") == null
        ? localStorage.getItem("vb-token")
        : sessionStorage.getItem("vb-token"));
    request.headers.common["Access-Control-Allow-Origin"] = "*";
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
