import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.probe.gg/",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "https://probe.gg"
  }
});

export default instance;
