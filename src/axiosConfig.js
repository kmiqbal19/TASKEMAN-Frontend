import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://add-task-backend.herokuapp.com/api/v1/",
});
export default axiosInstance;
