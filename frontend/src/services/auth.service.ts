import api from "../libs/api";
import { Login, Register, User } from "../types/auth.types";

const authService = {
  register: async (data: Register): Promise<User> => {
    const response = await api.post<User>("/auth/register", data);
    return response.data;
  },
  login: async (data: Login): Promise<User> => {
    const response = await api.post<User>("/auth/login", data);
    return response.data;
  },
  logout: async (): Promise<string> => {
    const response = await api.get(`/auth/logout`);
    return response.data;
  },
  getMe: async (): Promise<User> => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

export default authService;
