import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:35635/",
  //baseURL: "/",
  headers: {
    "Content-type": "application/json"
  }
});