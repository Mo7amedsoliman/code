import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
  timeout: 30000,
});

export default apiClient;
