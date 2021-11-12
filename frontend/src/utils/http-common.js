import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:1337",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
