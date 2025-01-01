/** @format */

import axios from "axios";
const axiosInstance = axios.create({
  //NOTE - local instance of firebase functions
  // baseURL: "http://127.0.0.1:5001/reb-7ceb2/us-central1/api",
  //NOTE - deployed version of amazon server on render.com
  baseURL: "https://amazon-api-ajxt.onrender.com/",
});
export { axiosInstance };
