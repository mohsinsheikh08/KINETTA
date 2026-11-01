import api from "../libs/api";
import { Authresponse, Login, Register, User } from "../types/auth.types";

const authService = {
  register: async (data: Register): Promise<User> => {
    const response = await api.post<Authresponse>("/auth/register", data);
    return response.data.user;
  },
  login: async (data: Login): Promise<User> => {
    const response = await api.post<Authresponse>("/auth/login", data);
    return response.data.user;
  },
  logout: async (): Promise<string> => {
    const response = await api.post(`/auth/logout`);
    return response.data;
  },
  getMe: async (): Promise<User> => {
    const response = await api.get<Authresponse>("/auth/me");
    return response.data.user;
  },
};

export default authService;
