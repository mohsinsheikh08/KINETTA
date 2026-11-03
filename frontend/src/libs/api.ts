import axios, { isAxiosError } from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`, 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest", 
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if(isAxiosError(error)){
      if(error.response?.status === 401){
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)
export default api;